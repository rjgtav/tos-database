import multiprocessing
import threading

threads = []
threads_enabled = multiprocessing.cpu_count() > 1
threads_semaphore = threading.Semaphore(multiprocessing.cpu_count()) if threads_enabled else None


def start(thread):
    global threads, threads_semaphore

    if threads_enabled:
        threads_semaphore.acquire()
        thread._error = False
        thread._semaphore = threads_semaphore
        thread.start()
        threads.append(thread)
    else:
        thread.run()

def join():
    global threads

    threads_error = False

    if threads_enabled:
        for thread in threads:
            thread.join()
            threads_error = threads_error or thread._error == True

    if threads_error:
        raise Exception('An error has occured in one of the threads')

    threads = []


class TOSThread(threading.Thread):

    def __init__(self):
        threading.Thread.__init__(self)

        self._error = False
        self._semaphore = None

    def run(self):
        try:
            self.run_implementation()
        except:
            self._error = True
            raise
        finally:
            self._semaphore.release()

    def run_implementation(self):
        raise NotImplementedError
