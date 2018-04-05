*START* // TODO: node myFile.js => Process and execute code in myFile.js

const pendingTimers = [];
const pendingOSTasks = []; // tasks using the underlying OS (networking, OS's async features)
const pendingOperations = []; // tasks running in the threadpool

// New timers, tasks, operations are recorded from myFile.js running
myFile.runContents();

function shouldContinue() {
  // Check one: Any pending setTimeout, setInterval, setImmediate?
  // Check two: Any pending OS tasks? (Like server listening to port)
  // Check three: Any pending long running operations? (Like fs module)
  return (
    pendingTimers.length || pendingOSTasks.length || pendingOperations.length
  );
}

// TODO: Do still have work to do? Look at timers, OS tasks, threadpool
  ***YES***
// Entire body executes in one 'tick' -- LOOP
while (shouldContinue()) {
  // TODO: 1) Run setTimeout's, setInterval's
  // => Node looks at pendingTimers
  // => and see if any functions (setTimeout, setInterval) are ready to be called

  -------------------
  // TODO: 2) Run callbacks for any os tasks or threadpool tasks that are done.
  // => Node looks at pendingOSTasks and pendingOperations
  // => and calls relevant callbacks
  // this is 99% of our code

  -------------------
  // TODO: 3) Pause and wait for stuff to happen
  // => Pause execution. Continue whenever...
  // --> a new pendingOSTasks is done
  // --> a new pendingOperations is done
  // --> a timer is about to complete

  -------------------
  // TODO: 4) Run any 'setImmediate' functions
  // => Look at pendingTimers. Call any setImmediate

  -------------------
  // TODO: 5) Handle any 'close events'
}

// TODO: Do still have work to do? Look at timers, OS tasks, threadpool
  ***NO***
*END*
// exit program, back to terminal
