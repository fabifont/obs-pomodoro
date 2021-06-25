# obs-pomodoro
This is a simple hardcoded pomodoro timer for OBS.

## How does it work
- a cycle is consists of two sessions: 50 minutes of work and 10 minutes of break
- each type of session has a counter
- there are two buttons: the left one is used to start/pause the timer and the right one is used to reset it (it won't reset sessions counters)
- every time a work session begins and ends an audio is played

## Setup
1. `git clone` this repo
2. Open OBS
3. Add source -> Browser -> Create new (choose a name and check the checkbox) -> click "Ok"
4. Check "Local file" -> Click the "URL" field and choose "index.html" that is inside the repo you cloned
5. Set both "Width" and "Height" to 500
6. Click "Refresh cache of current page"
7. Click "Ok"

## How to use it
1. Select the souce you created from the sources list
2. Right click on it
3. Interact
4. Enjoy

## Result
![image](https://user-images.githubusercontent.com/38903806/123492969-55fc6f00-d61b-11eb-8a65-f95179fab8f0.png)
