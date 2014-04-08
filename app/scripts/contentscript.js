"use strict";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.method == "getTableData") {
    var $tables = $("body").find("table").not(":hidden");    

    var data = []

    $tables.each(function() {
      var table = []

      $(this).find('tr').each(function() {
        var row = []

        $(this).find('td, th').each(function() {
          var $column = $(this).clone()
          row.push($column.text())
        });

        table.push(row);

      });

      data.push(table)

    })

  
    sendResponse({
      table_count: $tables.length,
      tables: data
    });
  }
  
});