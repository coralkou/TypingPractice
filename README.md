# TypingPractice
 A Django project that allows registered users to practice typing using customized content.

# Distinctiveness and Complexity
- Overview:
    This application is designed for those who have an interest in enhancing typing speed as well as memorizing content such as famous quotes or lyrics. Once registered, the user has access to create new documents for typing practice, edit their own documents and pick documents from his own creations or recommended list to start typing practice. The majority of the codes are dedicated to supporting the typing practice page. Once a document is picked, the user will first view the entire content of the document and once the "Go" is clicked, the user will start typing the document line by line. For each character to type, this character in the text line will be marked red and the desired key on the virtual keyboard will be highlighted. All typed characters in the current line will be marked green, whereas all future characters will be marked gray. During the typing practice, a timer will update every second to record how long has passed since the start of the practice and a counter will update the the number of correct characters that has been typed as well as the number of errors has been made against the total characters in this document. At the end of each practice, the accuracy and speed will be recorded as the final score. The user can click on user profile to view the score record and score history. There are options to view the score history for all documents or for a certain document that has been typed. Moreover, the history result can either be viewed as a table listed in reverse chronological order or a dotted line graph. 
- Distinctiveness:
    Unlike other projects being completed during the course, this application features a highly responsive client-side typing interface enabled by Javascript, and it is coupled with the backend database for typing content delivery and logging score records. Handling the user status, creating/editting the documents and listing of file titles as links are an incorporated demonstration of what have been practiced on previously. 
- Complexity:
    The below image demonstrates the overall structure under the Django framework. The 200+ lines of Python code in views.py handles backend functions such as page rendering as well as database access. 7 HTML templates are being used in this application, among which 3 of them has dedicated Javascript files that add up to more than 400 lines to handle DOM manipulation as well as making API calls to interact with the Python scripts. HTML files with the CSS file are used to make the user interface friendly to use and aesthetically pleasing to view.
![alt text](/blob/canva.png)

    For the typing practice page alone, multiple functions have to be delivered instantly and simutenously to satisfy the user experience. These functions include prompting for the next character, highlighting the virtual keyboard for desired keys, updating the timer, updating character counts, updating text line, detecting keydown events etc. 

    And for the profile page, I specially added an alternative graphic view to the tabled list, so that the users can see the progress through time more straightforwardly. In addition, the option to show results for any individual documentscan eliminate the difficulty variation among documents.

    Also, I added sound elements into the application. The user will be alerted with 'error' sound effect when typed incorrectly and there is another sound effect when the whole document has been completed. My original idea for the background music is to use an external API call for various music, but due to copyright restrictions, I ended up uploading one of my favorite music pieces as a static file and the user can choose whether to use it or not.

# User Interfaces
1. Index page. The'Recommend' tab can view up to 20 documents created by all users. Once a user is logged, he can access more functions such as "Create New", "Edit" or even start typing any of the documents.
![alt text](/blob/cover.png)
2. Add/edit page. To limit the length for each practice, the textarea has a limitation of a maximum of 1500 charactors and a minimum of 200 charactors. The same webpage is used for creating new document and edit existing document, the only difference is the prefilling of contents when editing.
![alt text](/blob/add.png)
3. List page. There are two kinds of lists: Recommended or My list. The major difference is that under My list(left), there is an extra 'Edit' button that the user can modify his own file at any time.
![alt text](/blob/list.png)
4. View and typing page. Once a document has been selected, the user can view the entire content of the document. Once 'Go' is clicked, the content will be prompted line by line for the user to type. In the meantime, the timer and the character counter will be active. It is okay to either 'Cancel' or 'Restart' if the user does not want the current score to be recorded.
![alt text](/blob/typing.png)
5. Profile page. If the user name is clicked, the user can view the status of his typing history. 
![alt text](/blob/profile.png)

# Explanation of Files
Other than default views in Django, the below files are created/modified for this application:
- models.py: In addition to the default 'User', two more models are being used. 'Doc' is for all the documents created by users and 'Score' is for all the typing records.
- urls.py: It contains all the valid url paths and their corresponding backend functions in views.py.
- views.py: The first 6 functions (index, list, typing, add, edit, profile) work with their corresponding html files to render different webpages as 'GET' requests. if the 'add' function is called by 'POST' request through form submission, it will insert a new Doc item into the database. There are 3 more API functions. 'recordScore' only accepts 'POST' requests to create new Score entry. 'obtainScore' is called when the user wants to check score history and it only works with 'GET'. 'read' is used to break up the document contents into lines for the preparation of typing practice.
- list.js: Respond to 'click' events on the list.html page to either edit the selected document or start the typing page.
- typing.js: The most complicated document in this project. Once the document is loaded through 'typing.html', it first runs 'load_view' to fetch the lines of the document and update variables such as 'total'. There are also event listeners for clicks on 'Go', 'Restart' and 'Cancel'. 'startTyping' will change the visibility of different sections on the page, start the timer and call 'type_row(1)'. It also enables the event listener for key press. The 'handleKeyPress' function will be active until the entire document has been finished. Subsequently, 'endTimer' and 'recordScore' will be called to stop the timer on the page and add a new item to Score.
- score.js: This document is used to change views on the 'score.html' page. Once the document is loaded, it waits for the choice selection of which document history to view. 'addScoreTable' function will enable the table view of the returned response, and each item is added into view through 'append_table'. 'ToggleView' responses to 'click' events to switch between the table view and the graph view. If the graph hasn't been made previously, 'add_graph' is called to convert accuracy and speed data into dottedline graph.
- HTML files. The html files support different web page views.


# To Run the Application
To run the application, make sure Django is installed and copy the repository into your local computer. When under the 'typingGame' directory, type "python manage.py runserver" and the application will be alive on your local server. Future efforts will be made to upload the application to a cloud platform so that the users can access it directly as a website.


