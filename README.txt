REPORT

The Sales Manager application is built with the following technologies:
- HTML5
- CSS3 using Twitter Bootstrap
- jQuery
- jQuery UI
- AngularJS
- ChartJS

The backend server was provided and is a jar file that hooks on to port 8080 of localhost. REST services are offered by the backend jar
file and consumed by the Sales Manager application. The entry point of the application is through the login page. An authorized user logs into the
application with their authorized username and password without which access is denied. Wrong username and password also denies access to the software.

The home page displays 4 charts with data pulled from the backend: a pie, bar and two table charts. Chart windows can me moved - dragged/sorted - and
resized. Content of the charts can be refreshed and the chart windows can be closed. Links are provided to display each chart in its own window.
The application uses AngularJs route providers to display these windows.

Footer links display their required contents as modals on all pages. The support link models a form submission action displaying a confirmation message
and closing the modal after 1 second.

Once a user is done with the software, they can click the "Logout" link and they are logged out of the software and redirected to the login page.

RUNNING THE APPLICATION

Requirement
- LAMP, XAMPP or WAMP server

Instructions
- Copy code folder into htdocs/, www/ or www/html/ folder depending on the server in use.
- Start up the server
- Direct browser to "htt://127.0.0.1/<code_folder_name>"
