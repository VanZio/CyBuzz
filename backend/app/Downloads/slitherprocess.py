import os
import subprocess

# Define the paths for the "Downloads" and "results" directories
downloads_directory = os.path.abspath(os.path.dirname(__file__))
results_directory = os.path.join(downloads_directory, "results")

# Create the "results" directory if it doesn't exist
if not os.path.exists(results_directory):
    os.makedirs(results_directory)

# Define the Slither command function
def run_slither(solidity_file, result_file_path):
    slither_command = f'slither "{solidity_file}" --checklist > "{result_file_path}.md"'
    solc_install = 'solc-select install 0.8.4'
    solc_use = 'solc-select use 0.8.4'

    try:
        subprocess.run(solc_install, check=True, text=True, shell=True)
        subprocess.run(solc_use, check=True, text=True, shell=True)
        subprocess.run(slither_command, check=True, text=True, shell=True)
        print("Slither ran successfully without any errors!")
    except subprocess.CalledProcessError as e:
        print(f"Slither encountered an error:\n{e.stdout}")
    except FileNotFoundError:
        print("Slither command not found. Ensure it's installed and available in PATH.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")



# Identify the most recent .sol file using your code snippet
filerecent = None
timerecent = 0
for entry in os.scandir(downloads_directory):
    if entry.is_file() and entry.name.endswith(".sol"):
        mod_time = entry.stat().st_mtime_ns
        if mod_time > timerecent:
            filerecent = entry.name
            timerecent = mod_time

# Run Slither on the most recent .sol file if found
if filerecent:
    uploaded_file = os.path.join(downloads_directory, filerecent)
    result_file = os.path.splitext(filerecent)[0] + "_result"
    result_file_path = os.path.join(results_directory, result_file)
    run_slither(uploaded_file, result_file_path)
else:
    print("No .sol files found in the 'Downloads' directory.")


