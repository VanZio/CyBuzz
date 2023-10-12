from app import app
import os
from flask import jsonify, request
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = os.path.abspath(os.path.dirname(__file__)) + '/Downloads/'
ALLOWED_EXTENSIONS = {'sol'}

def allowedFile(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST', 'GET'])
# API to upload file
def fileUpload():
    if request.method == 'POST':
        file = request.files.getlist('file')
        for f in file:
            filename = secure_filename(f.filename)
            if allowedFile(filename):
                f.save(os.path.join(UPLOAD_FOLDER, filename))
            else:
                return jsonify({'message': 'File type allowed only .sol'}), 400
        return jsonify({"name": filename, "status": "success"})
    elif request.method == 'GET':
        # Handle GET requests here if needed
        return jsonify({"status": "get_request_success"})
    else:
        return jsonify({"status": "failed"})

if __name__ == '__main__':
    app.run(debug=True)
