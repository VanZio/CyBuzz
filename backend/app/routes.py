from app import app
from flask import jsonify, request, Flask
from werkzeug.utils import secure_filename
import os

# Initialize contractName and filename as None
contractName = None
filename = None

UPLOAD_FOLDER = os.path.abspath(os.path.dirname(__file__)) + '/Downloads/'
ALLOWED_EXTENSIONS = {'sol'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST', 'GET'])
def file_upload():
    global contractName, filename  # Access global variables

    if request.method == 'POST' or 'GET':
        contractName = request.form['contractName'] 
        with open('app/contract_name.txt', 'a') as f:
            f.write("\n" + contractName)
        if 'file' not in request.files:
            return jsonify({'message': 'No file provided'}, 400)

        file = request.files['file']
            
        if file.filename == '':
            return jsonify({'message': 'No selected file'}, 400)

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)  # Update filename
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return jsonify({"filename": filename, "contractName": contractName, "status": "success"})
        else:
            return jsonify({'message': 'File type allowed only .sol'}, 400)
        
if __name__ == '__main__':
    app.run(debug=False)
