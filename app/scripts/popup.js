"use strict";

requestTables();

$(document).ready(function() {
  $("#refresh").click(function() {
    requestTables();
    setState("Loading...")
    $(".table-list").html("");
  });
})



function requestTables() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {method: "getTableData"}, function(response) {
      
      var count = response.table_count;

      if(count < 1) {
        setState("No tables found");
        return false;
      }

      var plural = count > 1 ? "s" : "";
      setState(count + " table" + plural + " found");

      for(var i = 0; i < response.tables.length; i++) {
        var table = response.tables[i];
        var text = JSON.stringify(table, null, 4);
        var html = '<textarea rows="20" class="table-card monospace">' + text + '</textarea>'
        $(".table-list").append(html);
      }

      
    });
  });
}

function setState(text) {
  $(".state").text(text);
}