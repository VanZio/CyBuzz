import os
import subprocess
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# Define the paths for the "Downloads" and "results" directories
downloads_directory = os.path.abspath(os.path.dirname(__file__))
results_directory = os.path.join(downloads_directory, "results")

# Create the "results" directory if it doesn't exist
if not os.path.exists(results_directory):
    os.makedirs(results_directory)

# Define the Slither command function
def run_slither(solidity_file, result_file_path):
    slither_command = f'slither "{solidity_file}" --checklist > "{result_file_path}.md"'

    try:
        subprocess.run(slither_command, check=True, text=True, shell=True)
        print("Slither ran successfully without any errors!")
    except subprocess.CalledProcessError as e:
        print(f"Slither encountered an error:\n{e.stdout}")
    except FileNotFoundError:
        print("Slither command not found. Ensure it's installed and available in PATH.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# Define a handler for monitoring file events
class MyHandler(FileSystemEventHandler):
    def on_created(self, event):
        if event.is_directory:
            return
        elif event.src_path.endswith(".sol"):
            uploaded_file = event.src_path
            result_file = os.path.splitext(os.path.basename(uploaded_file))[0] + "_result"
            result_file_path = os.path.join(results_directory, result_file)
            run_slither(uploaded_file, result_file_path)

# Set up the file system event handler and observer
event_handler = MyHandler()
observer = Observer()
observer.schedule(event_handler, path=downloads_directory, recursive=False)
observer.start()

try:
    observer.join()
except KeyboardInterrupt:
    observer.stop()
observer.join()