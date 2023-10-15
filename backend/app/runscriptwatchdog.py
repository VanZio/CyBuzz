import os
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import subprocess

class NewFileHandler(FileSystemEventHandler):
    def __init__(self, directory):
        self.directory = directory

    def on_created(self, event):
        if not event.is_directory and event.src_path.startswith(self.directory):
            print(f'New file created in {self.directory}: {event.src_path}')
            if self.directory == downloads_dir:
                run_slither_script()
            elif self.directory == results_dir:
                run_database_script()

def run_slither_script():
    slither_script_path = os.path.join(downloads_dir, 'slitherprocess.py')
    try:
        # Run the slither script 
        subprocess.call(['python', slither_script_path])
    except Exception as e:
        print(f"Error running the slither script: {str(e)}")

def run_database_script():
    database_script_path = os.path.join(os.path.dirname(__file__), 'run.py')
    
    # Wait for 10 seconds
    time.sleep(10)
    
    try:
        # Run the database script
        subprocess.call(['python', database_script_path])
    except Exception as e:
        print(f"Error running the database script: {str(e)}")

if __name__ == '__main__':
    # Define the paths to your "Downloads" and "Results" directories
    downloads_dir  = os.path.join(os.path.dirname(__file__), "Downloads")
    results_dir = os.path.join(downloads_dir, "results")

    # Create separate event handlers for the "Downloads" and "Results" directories
    downloads_handler = NewFileHandler(downloads_dir)
    results_handler = NewFileHandler(results_dir)

    # Create separate observers for the "Downloads" and "Results" directories
    observer_downloads = Observer()
    observer_downloads.schedule(downloads_handler, path=downloads_dir, recursive=False)
    observer_results = Observer()
    observer_results.schedule(results_handler, path=results_dir, recursive=False)

    try:
        observer_downloads.start()
        observer_results.start()
        print(f"Watching '{downloads_dir}' for new files...")
        print(f"Watching '{results_dir}' for new files...")

        # Keep the script running
        while True:
            time.sleep(1)

    except KeyboardInterrupt:
        observer_downloads.stop()
        observer_results.stop()

    observer_downloads.join()
    observer_results.join()
