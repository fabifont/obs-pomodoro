// select pomodoro display to edit timer content
const display = document.querySelector(".display")

// select start, pause & stop buttons
const main_button = document.querySelector(".main")
const reset_button = document.querySelector(".reset")
// const pauseButton = document.querySelector(".pause");

// select fields to increment total work & break sessions
const work_sessions = document.querySelector(".work-sessions")
const break_sessions = document.querySelector(".break-sessions")

// select div to display session type
const sessions = document.querySelector(".sessions")
const buttons = document.querySelector(".buttons")

// display initial timer state at the start
const progress_bar = new ProgressBar.Circle(display, {
  strokeWidth: 2,
  text: {
    value: "50:00"
  },
  trailColor: "rgba(255, 255, 255, 0.308)",
  color: "#f3f3f3",
  svgStyle: {
    //! IMPORTANT: make sure that your container has same
    //! aspect ratio as the SVG canvas. See SVG canvas sizes above.
    width: "85%"
  }
})

// progress_bar.text.style.fontSize = '7rem';

// set a flag to check if pomodoro was paused
let is_running = false

// set pomodoro interval time
let work_time = 50 * 60
let current_time = work_time
let break_time = 10 * 60

// set a variable to calculate time spent in current session
let time_spent = 0

// declare variable for setInterval
let timer_interval = null

// declare a variable to define type of session
let type = "WORK"

// set variables for counting total work & break sessions
let total_work_sessions = 0
let total_break_sessions = 0

// set a function to toggle session type
const toggle_session = function () {
  if (type === "WORK") {
    type = "BREAK"
    current_time = break_time
  } else {
    type = "WORK"
    current_time = work_time
  }
  let song = document.getElementById("song")
  song.play()
  start_timer()
}

// calculate session progress for progress bar
const calculate_progress = () => {
  // calculate the completion rate of this session
  let total_session_time = type === "WORK" ? work_time : break_time
  return time_spent / total_session_time
}

// set a display timer function to format time
const show_timer = function (input) {
  // convert seconds into minutes
  let minutes = Math.floor(input / 60)
  let seconds = input % 60

  // format time for single digit prepend by 0
  if (seconds < 10) {
    seconds = "0" + seconds
  }
  if (minutes < 10) {
    minutes = "0" + minutes
  }

  // return display time
  progress_bar.text.innerText = `${minutes}:${seconds}`
  work_sessions.textContent = total_work_sessions
  break_sessions.textContent = total_break_sessions
  sessions.textContent = is_running ? type : ""
}

// set a time function to run pomodoro intervals
const start_timer = function () {
  timer_interval = setInterval(function () {
    time_spent++
    current_time--
    show_timer(current_time)
    progress_bar.set(calculate_progress())
    if (current_time < 0) {
      if (type === "WORK") {
        total_work_sessions++
      } else {
        total_break_sessions++
      }
      time_spent = 0
      clearInterval(timer_interval)
      toggle_session()
      show_timer(current_time)
      progress_bar.set(calculate_progress())
    }
  }, 1000)
}

// set a function to pause timer
const pause_timer = function () {
  clearInterval(timer_interval)
}

// set a function to stop timer
const stop_timer = function () {
  time_spent = 0
  current_time = work_time
  clearInterval(timer_interval)
  show_timer(current_time)
  progress_bar.set(calculate_progress())
}

// listen for clicks on the document
document.addEventListener("click", function (event) {
  // start pomodoro on click on start button
  if (event.target.classList.contains("main")) {
    console.log(main_button.getAttribute("value"))
    if (main_button.getAttribute("value") == "play") {
      is_running = true
      start_timer()
      main_button.setAttribute("style", "background: red")
      main_button.setAttribute("value", "pause")
    } else {
      is_running = false
      pause_timer()
      main_button.setAttribute("style", "background: green")
      main_button.setAttribute("value", "play")
    }
  } else if (event.target.classList.contains("reset")) {
    is_running = false
    stop_timer()
    main_button.setAttribute("style", "background: green")
  }
})