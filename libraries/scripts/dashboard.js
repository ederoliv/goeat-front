window.onload = function() {
  const userDataString = sessionStorage.getItem('userData');
if (userDataString) {
    const userData = JSON.parse(userDataString);
    document.getElementById('userName').textContent = userData.name + " " + userData.partnerId;
}
};

// Sidebar Toggle Codes;

var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");
var sidebarCloseIcon = document.getElementById("sidebarIcon");

function toggleSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("sidebar_responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove("sidebar_responsive");
    sidebarOpen = false;
  }
}
