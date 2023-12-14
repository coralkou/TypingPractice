# TypingPractice
 A Django project that allows registered users to practice typing using customized content.

# Distinctiveness and Complexity
## Overview
    This application is designed for those who has interest in enhancing typing speed as well as memorizing contents such as famous quotes or lyrics. Once registered, the user has access to create new documents for typing practice, edit their own documents and pick documents from his own creations or system recommended list to start typing practice. The majority of the codes are dedicated to support the typing practice page. Once a document is being picked, the user will first view the entire content of the document and once the "Go" is clicked, the user will start typing the document line by line. For each charactor to type, this charactor in the text line will be marked red and the desired key on the virtual keyboard will be highlighted. All typed charactors in the current line will be marked green, versus all future charactors will be marked gray. During the typing practice, a timer will update every second to record how long since the start of the practice and a character counter will update the correct charactors that has been typed, the errors has been made against the total charactors in this document. At the end of each practice, the accuracy and speed will be recorded as final score. The user can click into user profile to view the score record and score history. There are options to view the score history for all documents or for a certain document that has been typed. Moreover, the history result can either be viewed as a table listed in reverse chronological order or a dotted line graph. 
## Distintiveness
    Unlike other projects being completed during the course, this application features a highly responsive client-side typing interface enabled by javascript, and it is coupled with the backend database for typing content delivery and logging score records. Handling the user status, create/edit the documents and how list of files are a incorporated demonstration of what have been experimented previously. 
## Complexity
    The below image demonstrates the overall strucuture under the Django framework. The 200+ lines of python code in views.py handles backend functions such as page rendering as well as database access. There are 7 HTML templates being used in this application, among which 3 of them has dedicated javascript files add up to more than 400 lines to handle DOM manipulation as well as making API calls to interact with the python scripts. HTML files with CSS file are used to make the user interface friendly to use and aesthetically pleasing to view.
    ![alt text](/blob/canva.png)

    For the typing practice page alone, multiple functions have to be delivered instantly and simutenously for satisfying user experience. These functions includes prompting for the next charactor, highlighting the virtual keyboard for desired keys, updating timer, updating charactor counts, updating text line, detecting keydown events etc. 

    And for the profile page, I specialy added an alternative graphic view to tabled list, so that the user can more straigtforwardly see the progress that has been made through time. In addition, the option to show results for a certain documents can elimate the difficulty variation among documents.

    Also, I added sound elements into the application. The user will be alerted with error sound effect if a typing mistake has occured and there is another sound effect when the whole document has been completed. My original idea for background music is to user an external API call for various music, but due to copyright restrictions, I ended up uploaded one of my favorite music pieces as a static file and the user can choose whether use it or not.

# User Interfaces
1. Index page. 'Recommend' tab can view up to 20 documents created by all users. Once a user is logged, he can access more functions such as "Create New", "Edit" or even start typing any of the documents.
![alt text](/blob/cover.png)
2. Add/edit page. To limit the length for each practice, the textarea has a limitation of maximum 1500 charactors and minimum 200 charactors. The same webpage is used for creating new document and edit existing document, the only difference is prefilling of contents when editing.
![alt text](/blob/add.png)
3. List page. There are two kinds of list: Recommended or My list. The major difference is that under My list(left), there is an extra 'Edit' button that the user can modify his own file at any time.
![alt text](/blob/list.png)
4. View and typing page. Once a document has been selected, the user can view the entire content of the document. Once 'Go' is clicked, the content will be prompted line by line for the user to type. In the meantime, the timer and the charactor counter will be active. It is okay to either 'Cancel' or 'Restart' if the user does not want the current score to be recorded.
![alt text](/blob/typing.png)
5. Profile page. If the user name is clicked, the user can view the status of his typing history. 
![alt text](/blob/profile.png)

# Explanation of Files
Other than default views in Django, the below files are created/modified for this application:
- models.py: In addition to the default 'User', there are two more models being used. 'Doc' is for all the documents created by users and 'Score' is for all the typing records.
- urls.py: It contains all the valid url paths and its corresponding backend function in views.py.
- views.py: The first 6 functions (index, list, typing, add, edit, profile) works with its corresponding html files to render different webpages as 'GET' requests. if the 'add' function is called by 'POST' request through form submission, it will insert a new Doc item into the database. There are 3 more API functions. 'recordScore' only accepts 'POST' requests to create new Score entry. 'obtainScore' is called when the user wants to check score history and it only works with 'GET'. 'read' is used to break up the document contents into lines for the preparation of typing practice.
- list.js: Respond to 'click' events on the list.html page to either edit the selected document or start the typing page.
- typing.js: The most complicated document in this project. Once the document is loaded through 'typing.html', it first run 'load_view' to fetch the lines of the document and update variables such as 'total'. There are also event listeners for clicks on 'Go', 'Restart' and 'Cancel'. 'startTyping' will change the visibility of different sections on the page, start the timer and call 'type_row(1)'. It also enables the eventlistener for key press. The 'handleKeyPress' function will be active until the entire document has been finished. Subsequently, 'endTimer' and 'recordScore' will be called to stop the timer on the page and add a new item to Score.
- score.js: This document is used to change views on the 'score.html' page. Once the document is loaded, it waits for the choice selection of which document history to view. 'addScoreTable' function will enable the table view of the returned response, and each item is added into view through 'append_table'. 'ToggleView' reponses to 'click' events to switch between the table view and the graph view. If the graph hasn't been made previously, 'add_graph' is called to convert accurary and speed data into dottedline graph.
- HTML files. The html files supports different web page views.


# To Run the Application
To run the application, make sure Django is installed and copy the repository into your local computer. When under the 'typingGame' directory, type "python manage.py runserver" and the application will be alive on your local server. Future effort will be made to upload the application to a cloud platform so that the users can access it directly as a website.


