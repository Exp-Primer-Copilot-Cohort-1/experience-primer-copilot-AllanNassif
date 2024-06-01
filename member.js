function skillsMember() {
  var member = document.getElementById("member");
  var memberValue = member.options[member.selectedIndex].value;
  var memberText = member.options[member.selectedIndex].text;
  if (memberValue == "new") {
    document.getElementById("newMember").style.display = "block";
  } else {
    document.getElementById("newMember").style.display = "none";
  }
}