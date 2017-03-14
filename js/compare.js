var ratingMetrics = ["BBB Rating", "Impact Score"];
var generalMetrics = ["Corporate Headquarters", "Outreach Offices",
    "Number of Donors", "Organization Type", "Scope of Impact",
    "Type of Work", "Years of Operation"];
var financialMetrics = ["Administrative Overhead", "Charitable Commitment",
    "Donor Dependency","Fundraising Efficiency", "Primary Support",
    "Tax Status", "Total Expenses"];


function initializeFilter(){
    $("#char-search").on('change keydown paste input', function(){
        search=document.getElementById('char-search').value.toLowerCase();
        if (search == ''){
            chars=document.getElementsByClassName('charity-element');
            for (var c =0; c<chars.length; c++){
                chars[c].style.display = 'block';
            }
        }else{
            chars=document.getElementsByClassName('charity-element');
            for (var c =0; c<chars.length; c++){
                if (chars[c].childNodes[0].innerHTML.toLowerCase().match(search)==null){
                    chars[c].style.display = 'none';
                }else{
                    chars[c].style.display = 'block';
                }
            }        
        }


    })
}
function loadSelectionMenu(){
  var obj = getSessionObject();
  var savedCharities = obj["savedCharities"];
  var initialSelectedCharities = obj["comparisonCharities"];
  var charityDetails = getCharityDetails();

  var elemList = document.getElementById("myCharitiesList");

  // prepopulate selected charities if comparison basket is empty
  if (initialSelectedCharities.length == 0){
    for (var i=0; i < Math.min(savedCharities.length, 4); i++){
      initialSelectedCharities.push(savedCharities[i]);
      obj["comparisonCharities"] = initialSelectedCharities;
      setSessionObject(obj);
    }
  }

  for (var i = 0; i < savedCharities.length; i++){
    text = charityDetails[savedCharities[i]].name;
    var elem = document.createElement("div");
    elemList.appendChild(elem);
    
    if (initialSelectedCharities.indexOf(savedCharities[i]) > -1){
      elem.className = "row charity-element charity-element-selected";
    } else{
      elem.className = "row charity-element";
    }

    var leftSide = document.createElement("div");
    leftSide.className = "col-md-10";
    leftSide.innerHTML = text;
    elem.appendChild(leftSide);

    var deleteButton = document.createElement("div");
    deleteButton.className = "col-md-2 glyphicon glyphicon-trash delete-button";
    elem.appendChild(deleteButton);

    var deleteHandler = function(elemList, elem, charityId){
        return function(){
            var sessObj = getSessionObject();
            var index = sessObj["savedCharities"].indexOf(charityId);
            if (index > -1){
                sessObj["savedCharities"].splice(index, 1);
                alloc = sessObj["allocationAmounts"][charityDetails[index]['name']];
                sessObj["percentAllocated"] -= alloc;
                delete sessObj["allocationAmounts"][charityDetails[index]['name']];
                setSessionObject(sessObj);
            }
            elemList.removeChild(elem);
        };
    }(elemList, elem, savedCharities[i]);
    deleteButton.addEventListener("click", deleteHandler);

    var clickHandler = function(elem, charityId){
      return function(){
        if (elem.className.split(" ").length == 2){
          // Charity is not currently selected
          elem.className = "row charity-element charity-element-selected";
          var sessObj = getSessionObject();
          sessObj["comparisonCharities"].push(charityId);
          setSessionObject(sessObj);
          console.log(sessObj["comparisonCharities"]);
          updateComparison(sessObj["comparisonCharities"]);

        } else{
          // Charity is already selected
          elem.className = "row charity-element";
          var sessObj = getSessionObject();
          var removeIndex = sessObj["comparisonCharities"].indexOf(charityId);
          if (removeIndex > -1){
            sessObj["comparisonCharities"].splice(removeIndex, 1);
          }
          setSessionObject(sessObj);
          updateComparison(sessObj["comparisonCharities"]);
        }
      }}(elem, savedCharities[i]);
    leftSide.addEventListener("click", clickHandler);
  }
}

function updateComparison(charityIds){
  // Display up to a maxiumum of 4 charities for comparison
  var numComparisons = Math.min(charityIds.length, 4);
  // Out of 12 column grid - 2 columns reserved for metric name - 10 remaining
  var bootstrapColumnSize = Math.floor(10 / numComparisons);
  var obj = getSessionObject();
  var comparisonMetrics = obj["comparisonMetrics"];
  var charityDetails = getCharityDetails();
  var comparisonView = document.getElementById("comparisonList");
  comparisonView.innerHTML = "";

  // first column with charity names and pictures
  var firstRow = document.createElement("div");
  firstRow.className = "row comparison-name-row";
  comparisonView.appendChild(firstRow);

  var editButtonSpace = document.createElement("div");
  editButtonSpace.className = "col-md-2";
  firstRow.appendChild(editButtonSpace);
  var editButton = document.createElement("div");
  editButton.className = "edit-button";
  editButton.innerHTML = "Edit Metrics";
  editButtonSpace.appendChild(editButton);
  editButton.addEventListener("click", editMetricsHandler);
  for (var i = 0; i < numComparisons; i++){
    var charityName = charityDetails[charityIds[i]].name;
    var charityNameColumn = document.createElement("div");
    charityNameColumn.className = "col-md-" + bootstrapColumnSize;
    charityNameColumn.innerHTML = charityName;
    firstRow.appendChild(charityNameColumn);
  }

  // remaining columns of comparison chart
  for (var i = 0; i < comparisonMetrics.length; i ++){
    var comparisonMetric = comparisonMetrics[i];
    var row = document.createElement("div");
    row.className = ((i%2==0) ? "row comparison-row-even" : "row comparison-row-odd");
    comparisonView.appendChild(row);
    var nameColumn = document.createElement("div");
    nameColumn.className = "col-md-2";
    nameColumn.innerHTML = comparisonMetric;
    row.appendChild(nameColumn); 
    for (var j = 0; j < numComparisons; j++){
      var column = document.createElement("div");
      column.className = "col-md-" + bootstrapColumnSize;
      charityId = charityIds[j];
      var charityMetricValue = charityDetails[charityId][comparisonMetric];
      column.innerHTML = charityMetricValue;
      row.appendChild(column);
    }
  }
}



function editMetricsHandler(){
  // Create a model pop-up which prepopulates with the current comparison metrics
// Have a button to update metrics
  var sessObj = getSessionObject();
  var modal = document.getElementById("metricSelectionModal");
  modal.style.display = "block";

  var modalCloseButton = document.getElementById("modalCloseButton");
  modalCloseButton.onclick = function(){
    modal.style.display = "none";
  };

  // Click anywhere outside of modal causes it to close
  window.onclick = function(event){
    if (event.target == modal){
      modal.style.display = "none";
    }
  }
  // Generate list of possible metrics to select from
  var allMetricsView = document.getElementById("allMetricsView");
  allMetricsView.innerHTML = "";
  var generateMetricsList = function(title, metricNames, selectedMetrics){
    var column = document.createElement("div");
    column.className = "col-md-4";
    var titleElem = document.createElement("div");
    titleElem.className = "row";
    titleElem.innerHTML = "<h3>"+title+"</h3>";
    column.appendChild(titleElem);
    for (var i=0; i<metricNames.length; i++){
      var metricElem = document.createElement("div");
      if (selectedMetrics.indexOf(metricNames[i]) > -1){
        metricElem.className = "row metric-elem metric-elem-selected"
      } else {
        metricElem.className = "row metric-elem";
      }
      metricElem.innerHTML = metricNames[i];
      metricElem.addEventListener("click", function(metricElem){
        return function(){
          if (metricElem.className.split(" ").indexOf("metric-elem-selected") > -1){
            metricElem.className = "row metric-elem"
          } else {
            metricElem.className = "row metric-elem metric-elem-selected";
          }
        };
      }(metricElem));
      column.appendChild(metricElem);
    }
   return column; 
  };
  selectedMetrics = sessObj["comparisonMetrics"];
  allMetricsView.appendChild(generateMetricsList("Ratings",
        ratingMetrics, selectedMetrics));
  allMetricsView.appendChild(generateMetricsList("General Info",
        generalMetrics, selectedMetrics));
  allMetricsView.appendChild(generateMetricsList("Financials",
        financialMetrics, selectedMetrics));

  // Generate update metrics button
  var updateMetricsButton = document.getElementById("updateMetricsButton");
  updateMetricsButton.onclick = function(){
    //TODO : update comparison metrics in session state
    var selectedMetrics = document.getElementsByClassName("metric-elem-selected");
    var selectedMetricNames = [];
    for (var i=0; i<selectedMetrics.length; i++){
      selectedMetricNames.push(selectedMetrics[i].innerHTML);
    }
    sessObj["comparisonMetrics"] = selectedMetricNames;
    setSessionObject(sessObj);
    modal.style.display = "none";
    updateComparison(sessObj["comparisonCharities"]);
  }; 

}
