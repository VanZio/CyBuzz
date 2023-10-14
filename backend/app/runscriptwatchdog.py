import os
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import subprocess

class NewFileHandler(FileSystemEventHandler):
    def on_created(self, event):
        if not event.is_directory:
            print(f'New file created: {event.src_path}')
            if event.src_path.startswith(downloads_dir):
                run_downloads_script()
            elif event.src_path.startswith(results_dir):
                run_results_script()

def run_downloads_script():
    slither_script_path = os.path.join(downloads_dir, 'slitherprocess.py')
    database_script_path = os.path.join(os.path.dirname(__file__), 'database.py')
    try:
        # Run the first script here
        subprocess.call(['python', slither_script_path])
        subprocess.call(['python', database_script_path])
    except Exception as e:
        print(f"Error running the scripts: {str(e)}")

def run_results_script():
    insert_script_path = os.path.join(os.path.dirname(__file__), 'insert.py')
    try:
        # Run the second script here
        subprocess.call(['python', insert_script_path])
    except Exception as e:
        print(f"Error running the results script: {str(e)}")

if __name__ == '__main__':
    # Define the paths to your "Downloads" and "Results" directories
    downloads_dir  = os.path.join(os.path.dirname(__file__), "Downloads")
    results_dir = os.path.join(downloads_dir, "results")

    # Create the observer and handler
    event_handler = NewFileHandler()
    observer = Observer()
    observer.schedule(event_handler, path=downloads_dir, recursive=False)
    observer.schedule(event_handler, path=results_dir, recursive=False)

    try:
        observer.start()
        print(f"Watching '{downloads_dir}' for new files...")
        print(f"Watching '{results_dir}' for new files...")

        # Keep the script running
        while True:
            time.sleep(1)

    except KeyboardInterrupt:
        observer.stop()

    observer.join()