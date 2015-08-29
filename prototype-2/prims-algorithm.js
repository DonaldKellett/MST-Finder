"use strict";

/*
  prims-algorithm.js
  Prim's Algorithm
  Uses the Prim's Algorithm (Matrix) Method to find a minimum spanning tree
  (c) Donald Leung.  All rights reserved.
*/

document.getElementById("init").style.display = "block";

var vertexNum, distanceMatrix, loop, loop2, loop3, startPoint, endPoint, distanceMatrixX, distanceMatrixY, edgeLength, inspectColumns = [], tempArray = [], tempSmallestNumber, temp1, temp2, alreadyDone1 = false, alreadyDone2 = false, alreadyDone3 = false, alreadyDone4 = false, firstEdgeText = "", secondEdgeText = "", thirdEdgeText = "", fourthEdgeText = "", totalEdgeLength = 0;

function init() {
  if (isNaN(parseInt(document.getElementById("vertexNum").value))) {
    alert("Please enter a number.");
  } else if (parseInt(document.getElementById("vertexNum").value) > 6) {
    // Maximum Number of Points this Program can handle is 6 vertices!  If the number is too big just reject it!
    alert("This program can only deal with a maximum of 6 vertices.  Please enter a lower number.");
  } else if (parseInt(document.getElementById("vertexNum").value) < 4) {
    // The program's pretty useless if there are less than 4 edges, do you agree?
    alert("Please enter a number greater than 3.");
  } else if (parseInt(document.getElementById("vertexNum").value) !== 4 && parseInt(document.getElementById("vertexNum").value) !== 5) {
    alert("Sorry, as of 28/08/15, this application can only deal with graphs of 4 or 5 vertices.  Please remember to check regularly!");
  } else {
    vertexNum = parseInt(document.getElementById("vertexNum").value);
    document.getElementById("init").style.display = "none";
    document.getElementById("mainPanel").style.display = "block";
    distanceMatrix = new Array(vertexNum);
    for (loop = 0; loop < vertexNum; loop++) {
      distanceMatrix[loop] = new Array(vertexNum);
    }
    // console.log(distanceMatrix);
    for (loop = 0; loop < vertexNum; loop++) {
      for (loop2 = 0; loop2 < vertexNum; loop2++) {
        distanceMatrix[loop][loop2] = "-";
      }
    }
    // console.log(distanceMatrix);
    drawMatrix();
  }
}

function drawMatrix() {
  if (vertexNum === 4) {
    document.getElementById("distanceMatrix").innerHTML = "<thead>"+
      "<tr>"+
        "<td></td>"+
        "<td>A</td>"+
        "<td>B</td>"+
        "<td>C</td>"+
        "<td>D</td>"+
      "</tr>"+
    "</thead>"+
    "<tbody>"+
      "<tr>"+
        "<td>A</td>"+
        "<td>"+distanceMatrix[0][0]+"</td>"+
        "<td>"+distanceMatrix[0][1]+"</td>"+
        "<td>"+distanceMatrix[0][2]+"</td>"+
        "<td>"+distanceMatrix[0][3]+"</td>"+
      "</tr>"+
      "<tr>"+
        "<td>B</td>"+
        "<td>"+distanceMatrix[1][0]+"</td>"+
        "<td>"+distanceMatrix[1][1]+"</td>"+
        "<td>"+distanceMatrix[1][2]+"</td>"+
        "<td>"+distanceMatrix[1][3]+"</td>"+
      "</tr>"+
      "<tr>"+
        "<td>C</td>"+
        "<td>"+distanceMatrix[2][0]+"</td>"+
        "<td>"+distanceMatrix[2][1]+"</td>"+
        "<td>"+distanceMatrix[2][2]+"</td>"+
        "<td>"+distanceMatrix[2][3]+"</td>"+
      "</tr>"+
      "<tr>"+
        "<td>D</td>"+
        "<td>"+distanceMatrix[3][0]+"</td>"+
        "<td>"+distanceMatrix[3][1]+"</td>"+
        "<td>"+distanceMatrix[3][2]+"</td>"+
        "<td>"+distanceMatrix[3][3]+"</td>"+
      "</tr>"+
    "</tbody>";
  } else if (vertexNum === 5) {
    document.getElementById("distanceMatrix").innerHTML = "<thead>"+
      "<tr>"+
        "<td></td>"+
        "<td>A</td>"+
        "<td>B</td>"+
        "<td>C</td>"+
        "<td>D</td>"+
        "<td>E</td>"+
      "</tr>"+
    "</thead>"+
    "<tbody>"+
      "<tr>"+
        "<td>A</td>"+
        "<td>"+distanceMatrix[0][0]+"</td>"+
        "<td>"+distanceMatrix[0][1]+"</td>"+
        "<td>"+distanceMatrix[0][2]+"</td>"+
        "<td>"+distanceMatrix[0][3]+"</td>"+
        "<td>"+distanceMatrix[0][4]+"</td>"+
      "</tr>"+
      "<tr>"+
        "<td>B</td>"+
        "<td>"+distanceMatrix[1][0]+"</td>"+
        "<td>"+distanceMatrix[1][1]+"</td>"+
        "<td>"+distanceMatrix[1][2]+"</td>"+
        "<td>"+distanceMatrix[1][3]+"</td>"+
        "<td>"+distanceMatrix[1][4]+"</td>"+
      "</tr>"+
      "<tr>"+
        "<td>C</td>"+
        "<td>"+distanceMatrix[2][0]+"</td>"+
        "<td>"+distanceMatrix[2][1]+"</td>"+
        "<td>"+distanceMatrix[2][2]+"</td>"+
        "<td>"+distanceMatrix[2][3]+"</td>"+
        "<td>"+distanceMatrix[2][4]+"</td>"+
      "</tr>"+
      "<tr>"+
        "<td>D</td>"+
        "<td>"+distanceMatrix[3][0]+"</td>"+
        "<td>"+distanceMatrix[3][1]+"</td>"+
        "<td>"+distanceMatrix[3][2]+"</td>"+
        "<td>"+distanceMatrix[3][3]+"</td>"+
        "<td>"+distanceMatrix[3][4]+"</td>"+
      "</tr>"+
      "<tr>"+
        "<td>E</td>"+
        "<td>"+distanceMatrix[4][0]+"</td>"+
        "<td>"+distanceMatrix[4][1]+"</td>"+
        "<td>"+distanceMatrix[4][2]+"</td>"+
        "<td>"+distanceMatrix[4][3]+"</td>"+
        "<td>"+distanceMatrix[4][4]+"</td>"+
      "</tr>"+
    "</tbody>";
  } else {
    console.log("This program can currently only deal with graphs of 4 or 5 vertices.  Sorry for the inconvenience.");
  }
}

function addEdge() {
  if (vertexNum === 4) {
    // console.log("Edge Added!");
    startPoint = prompt("Please enter your starting point.");
    if (startPoint !== "A" && startPoint !== "B" && startPoint !== "C" && startPoint !== "D") {
      // Invalid Response!  Terminate Process
      alert("Sorry, your response was invalid.  Please enter a capital letter: A/B/C/D");
    } else {
      if (startPoint === "A") {
        distanceMatrixX = 0;
      } else if (startPoint === "B") {
        distanceMatrixX = 1;
      } else if (startPoint === "C") {
        distanceMatrixX = 2;
      } else {
        distanceMatrixX = 3;
      }
      endPoint = prompt("Please enter your endpoint.");
      if (endPoint !== "A" && endPoint !== "B" && endPoint !== "C" && endPoint !== "D") {
        alert("Sorry, your response was invalid.  Please enter a capital letter: A/B/C/D");
      } else {
        if (endPoint === startPoint) {
          alert("Invalid Request.  You cannot start and end at the same edge (unless you are deliberately trying to fool me :p)");
        } else {
          if (endPoint === "A") {
            distanceMatrixY = 0;
          } else if  (endPoint === "B") {
            distanceMatrixY = 1;
          } else if  (endPoint === "C") {
            distanceMatrixY = 2;
          } else {
            distanceMatrixY = 3;
          }
          edgeLength = parseInt(prompt("Please enter the length of your edge."));
          if (isNaN(edgeLength) || edgeLength <= 0) {
            alert("Please enter a positive number and try again.");
          } else {
            distanceMatrix[distanceMatrixX][distanceMatrixY] = edgeLength;
            distanceMatrix[distanceMatrixY][distanceMatrixX] = edgeLength;
            drawMatrix();
          }
        }
      }
    }
  } else if (vertexNum === 5) {
    // console.log("Edge Added!");
    startPoint = prompt("Please enter your starting point.");
    if (startPoint !== "A" && startPoint !== "B" && startPoint !== "C" && startPoint !== "D" && startPoint !== "E") {
      // Invalid Response!  Terminate Process
      alert("Sorry, your response was invalid.  Please enter a capital letter: A/B/C/D/E");
    } else {
      if (startPoint === "A") {
        distanceMatrixX = 0;
      } else if (startPoint === "B") {
        distanceMatrixX = 1;
      } else if (startPoint === "C") {
        distanceMatrixX = 2;
      } else if (startPoint === "D") {
        distanceMatrixX = 3;
      } else {
        distanceMatrixX = 4;
      }
      endPoint = prompt("Please enter your endpoint.");
      if (endPoint !== "A" && endPoint !== "B" && endPoint !== "C" && endPoint !== "D" && endPoint !== "E") {
        alert("Sorry, your response was invalid.  Please enter a capital letter: A/B/C/D/E");
      } else {
        if (endPoint === startPoint) {
          alert("Invalid Request.  You cannot start and end at the same edge (unless you are deliberately trying to fool me :p)");
        } else {
          if (endPoint === "A") {
            distanceMatrixY = 0;
          } else if (endPoint === "B") {
            distanceMatrixY = 1;
          } else if (endPoint === "C") {
            distanceMatrixY = 2;
          } else if (endPoint === "D") {
            distanceMatrixY = 3;
          } else {
            distanceMatrixY = 4;
          }
          edgeLength = parseInt(prompt("Please enter the length of your edge."));
          if (isNaN(edgeLength) || edgeLength <= 0) {
            alert("Please enter a positive number and try again.");
          } else {
            distanceMatrix[distanceMatrixX][distanceMatrixY] = edgeLength;
            distanceMatrix[distanceMatrixY][distanceMatrixX] = edgeLength;
            drawMatrix();
          }
        }
      }
    }
  } else {
    console.log("This program can currently only deal with graphs of 4 or 5 vertices.  Sorry for the inconvenience.");
  }
}

function primsAlgorithm() {
  // console.log("The real work starts here!");
  if (vertexNum === 4) {
    // Start at Point A - cross out Row A
    distanceMatrix[0] = ["-", "-", "-", "-"];
    drawMatrix();
    inspectColumns[0] = 0;
    for (loop = 0; loop < inspectColumns.length; loop++) {
      for (loop2 = 0; loop2 < vertexNum; loop2++) {
        if (typeof(distanceMatrix[loop2][inspectColumns[loop]]) === "number") {
          tempArray[tempArray.length] = distanceMatrix[loop2][inspectColumns[loop]];
        }
      }
    }
    // console.log(tempArray);
    for (loop = 0; loop < tempArray.length; loop++) {
      for (loop2 = 1; loop2 < tempArray.length; loop2++) {
        // A bit like Bubblesort or Shuttle Sort Algorithm, but does a few extra (unneccesary) steps
        // Reason: I'm too lazy to think :p
        if (tempArray[loop2] < tempArray[loop2 - 1]) {
          // Swap the 2 values
          temp1 = tempArray[loop2 - 1];
          temp2 = tempArray[loop2];
          tempArray[loop2] = temp1;
          tempArray[loop2 - 1] = temp2;
        }
      }
    }
    tempSmallestNumber = tempArray[0];
    tempArray = [];  // Empty Array
    // console.log(tempSmallestNumber);
    for (loop = 0; loop < inspectColumns.length; loop++) {
      for (loop2 = 0; loop2 < vertexNum; loop2++) {
        if (typeof(distanceMatrix[loop2][inspectColumns[loop]]) === "number") {
          if (tempSmallestNumber !== distanceMatrix[loop2][inspectColumns[loop]] || alreadyDone1 === true) {
            console.log("Either this entry does not contain the smallest number or the smallest number has been found already.");
          } else {
            alreadyDone1 = true;
            // Mark down which edge was chosen
            switch(loop2) {
              case 0:
                firstEdgeText += "A";
                break;
              case 1:
                firstEdgeText += "B";
                break;
              case 2:
                firstEdgeText += "C";
                break;
              case 3:
                firstEdgeText += "D";
                break;
            }
            switch(inspectColumns[loop]) {
              case 0:
                firstEdgeText += "A";
                break;
              case 1:
                firstEdgeText += "B";
                break;
              case 2:
                firstEdgeText += "C";
                break;
              case 3:
                firstEdgeText += "D";
                break;
            }
            // Add this edge to total edge length
            totalEdgeLength += tempSmallestNumber
            // Reset the value of tempSmallestNumber
            tempSmallestNumber = 0;
            // Clear that row
            distanceMatrix[loop2] = ["-", "-", "-", "-"];
            drawMatrix();
            inspectColumns[inspectColumns.length] = loop2;
            // console.log(inspectColumns);
            for (loop = 0; loop < inspectColumns.length; loop++) {
              for (loop2 = 0; loop2 < vertexNum; loop2++) {
                if (typeof(distanceMatrix[loop2][inspectColumns[loop]]) === "number") {
                  tempArray[tempArray.length] = distanceMatrix[loop2][inspectColumns[loop]];
                }
              }
            }
            // console.log(tempArray);
            for (loop = 0; loop < tempArray.length; loop++) {
              for (loop2 = 1; loop2 < tempArray.length; loop2++) {
                // A bit like Bubblesort or Shuttle Sort Algorithm, but does a few extra (unneccesary) steps
                // Reason: I'm too lazy to think :p
                if (tempArray[loop2] < tempArray[loop2 - 1]) {
                  // Swap the 2 values
                  temp1 = tempArray[loop2 - 1];
                  temp2 = tempArray[loop2];
                  tempArray[loop2] = temp1;
                  tempArray[loop2 - 1] = temp2;
                }
              }
            }
            tempSmallestNumber = tempArray[0];
            tempArray = [];  // Empty Array
            // console.log(tempSmallestNumber);
            for (loop = 0; loop < inspectColumns.length; loop++) {
              for (loop2 = 0; loop2 < vertexNum; loop2++) {
                if (typeof(distanceMatrix[loop2][inspectColumns[loop]]) === "number") {
                  if (tempSmallestNumber !== distanceMatrix[loop2][inspectColumns[loop]] || alreadyDone2 === true) {
                    console.log("Either this entry does not contain the smallest number or the smallest number has been found already.");
                  } else {
                    alreadyDone2 = true;
                    // Mark down which edge was chosen
                    switch(loop2) {
                      case 0:
                        secondEdgeText += "A";
                        break;
                      case 1:
                        secondEdgeText += "B";
                        break;
                      case 2:
                        secondEdgeText += "C";
                        break;
                      case 3:
                        secondEdgeText += "D";
                        break;
                    }
                    switch(inspectColumns[loop]) {
                      case 0:
                        secondEdgeText += "A";
                        break;
                      case 1:
                        secondEdgeText += "B";
                        break;
                      case 2:
                        secondEdgeText += "C";
                        break;
                      case 3:
                        secondEdgeText += "D";
                        break;
                    }
                    // Add this edge to total edge length
                    totalEdgeLength += tempSmallestNumber
                    // Reset the value of tempSmallestNumber
                    tempSmallestNumber = 0;
                    // Clear that row
                    distanceMatrix[loop2] = ["-", "-", "-", "-"];
                    drawMatrix();
                    inspectColumns[inspectColumns.length] = loop2;
                    // console.log(inspectColumns);
                    for (loop = 0; loop < inspectColumns.length; loop++) {
                      for (loop2 = 0; loop2 < vertexNum; loop2++) {
                        if (typeof(distanceMatrix[loop2][inspectColumns[loop]]) === "number") {
                          tempArray[tempArray.length] = distanceMatrix[loop2][inspectColumns[loop]];
                        }
                      }
                    }
                    // console.log(tempArray);
                    for (loop = 0; loop < tempArray.length; loop++) {
                      for (loop2 = 1; loop2 < tempArray.length; loop2++) {
                        // A bit like Bubblesort or Shuttle Sort Algorithm, but does a few extra (unneccesary) steps
                        // Reason: I'm too lazy to think :p
                        if (tempArray[loop2] < tempArray[loop2 - 1]) {
                          // Swap the 2 values
                          temp1 = tempArray[loop2 - 1];
                          temp2 = tempArray[loop2];
                          tempArray[loop2] = temp1;
                          tempArray[loop2 - 1] = temp2;
                        }
                      }
                    }
                    tempSmallestNumber = tempArray[0];
                    tempArray = [];  // Empty Array
                    // console.log(tempSmallestNumber);
                    for (loop = 0; loop < inspectColumns.length; loop++) {
                      for (loop2 = 0; loop2 < vertexNum; loop2++) {
                        if (typeof(distanceMatrix[loop2][inspectColumns[loop]]) === "number") {
                          if (tempSmallestNumber !== distanceMatrix[loop2][inspectColumns[loop]] || alreadyDone3 === true) {
                            console.log("Either this entry does not contain the smallest number or the smallest number has been found already.");
                          } else {
                            alreadyDone3 = true;
                            // Mark down which edge was chosen
                            switch(loop2) {
                              case 0:
                                thirdEdgeText += "A";
                                break;
                              case 1:
                                thirdEdgeText += "B";
                                break;
                              case 2:
                                thirdEdgeText += "C";
                                break;
                              case 3:
                                thirdEdgeText += "D";
                                break;
                            }
                            switch(inspectColumns[loop]) {
                              case 0:
                                thirdEdgeText += "A";
                                break;
                              case 1:
                                thirdEdgeText += "B";
                                break;
                              case 2:
                                thirdEdgeText += "C";
                                break;
                              case 3:
                                thirdEdgeText += "D";
                                break;
                            }
                            // Add this edge to total edge length
                            totalEdgeLength += tempSmallestNumber
                            // Reset the value of tempSmallestNumber
                            tempSmallestNumber = 0;
                            // Clear that row
                            distanceMatrix[loop2] = ["-", "-", "-", "-"];
                            drawMatrix();
                            inspectColumns[inspectColumns.length] = loop2;
                            // console.log(inspectColumns);
                            document.getElementById("mainPanel").style.display = "none";
                            document.getElementById("findMST").style.display = "block";
                            document.getElementById("mstEdges").innerHTML = firstEdgeText + ", " + secondEdgeText + ", " + thirdEdgeText;
                            document.getElementById("mstWeight").innerHTML = totalEdgeLength;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  } else if (vertexNum === 5) {
    // Start at Point A - cross out Row A
    distanceMatrix[0] = ["-", "-", "-", "-", "-"];
    drawMatrix();
    inspectColumns[0] = 0;
    for (loop = 0; loop < inspectColumns.length; loop++) {
      for (loop2 = 0; loop2 < vertexNum; loop2++) {
        if (typeof(distanceMatrix[loop2][inspectColumns[loop]]) === "number") {
          tempArray[tempArray.length] = distanceMatrix[loop2][inspectColumns[loop]];
        }
      }
    }
    // console.log(tempArray);
    for (loop = 0; loop < tempArray.length; loop++) {
      for (loop2 = 1; loop2 < tempArray.length; loop2++) {
        // A bit like Bubblesort or Shuttle Sort Algorithm, but does a few extra (unneccesary) steps
        // Reason: I'm too lazy to think :p
        if (tempArray[loop2] < tempArray[loop2 - 1]) {
          // Swap the 2 values
          temp1 = tempArray[loop2 - 1];
          temp2 = tempArray[loop2];
          tempArray[loop2] = temp1;
          tempArray[loop2 - 1] = temp2;
        }
      }
    }
    tempSmallestNumber = tempArray[0];
    tempArray = [];  // Empty Array
    // console.log(tempSmallestNumber);
    for (loop = 0; loop < inspectColumns.length; loop++) {
      for (loop2 = 0; loop2 < vertexNum; loop2++) {
        if (typeof(distanceMatrix[loop2][inspectColumns[loop]]) === "number") {
          if (tempSmallestNumber !== distanceMatrix[loop2][inspectColumns[loop]] || alreadyDone1 === true) {
            console.log("Either this entry does not contain the smallest number or the smallest number has been found already.");
          } else {
            alreadyDone1 = true;
            // Mark down which edge was chosen
            switch(loop2) {
              case 0:
                firstEdgeText += "A";
                break;
              case 1:
                firstEdgeText += "B";
                break;
              case 2:
                firstEdgeText += "C";
                break;
              case 3:
                firstEdgeText += "D";
                break;
              case 4:
                firstEdgeText += "E";
                break;
            }
            switch(inspectColumns[loop]) {
              case 0:
                firstEdgeText += "A";
                break;
              case 1:
                firstEdgeText += "B";
                break;
              case 2:
                firstEdgeText += "C";
                break;
              case 3:
                firstEdgeText += "D";
                break;
              case 4:
                firstEdgeText += "E";
                break;
            }
            // Add this edge to total edge length
            totalEdgeLength += tempSmallestNumber
            // Reset the value of tempSmallestNumber
            tempSmallestNumber = 0;
            // Clear that row
            distanceMatrix[loop2] = ["-", "-", "-", "-", "-"];
            drawMatrix();
            inspectColumns[inspectColumns.length] = loop2;
            // console.log(inspectColumns);
            for (loop = 0; loop < inspectColumns.length; loop++) {
              for (loop2 = 0; loop2 < vertexNum; loop2++) {
                if (typeof(distanceMatrix[loop2][inspectColumns[loop]]) === "number") {
                  tempArray[tempArray.length] = distanceMatrix[loop2][inspectColumns[loop]];
                }
              }
            }
            // console.log(tempArray);
            for (loop = 0; loop < tempArray.length; loop++) {
              for (loop2 = 1; loop2 < tempArray.length; loop2++) {
                // A bit like Bubblesort or Shuttle Sort Algorithm, but does a few extra (unneccesary) steps
                // Reason: I'm too lazy to think :p
                if (tempArray[loop2] < tempArray[loop2 - 1]) {
                  // Swap the 2 values
                  temp1 = tempArray[loop2 - 1];
                  temp2 = tempArray[loop2];
                  tempArray[loop2] = temp1;
                  tempArray[loop2 - 1] = temp2;
                }
              }
            }
            tempSmallestNumber = tempArray[0];
            tempArray = [];  // Empty Array
            // console.log(tempSmallestNumber);
            for (loop = 0; loop < inspectColumns.length; loop++) {
              for (loop2 = 0; loop2 < vertexNum; loop2++) {
                if (typeof(distanceMatrix[loop2][inspectColumns[loop]]) === "number") {
                  if (tempSmallestNumber !== distanceMatrix[loop2][inspectColumns[loop]] || alreadyDone2 === true) {
                    console.log("Either this entry does not contain the smallest number or the smallest number has been found already.");
                  } else {
                    alreadyDone2 = true;
                    // Mark down which edge was chosen
                    switch(loop2) {
                      case 0:
                        secondEdgeText += "A";
                        break;
                      case 1:
                        secondEdgeText += "B";
                        break;
                      case 2:
                        secondEdgeText += "C";
                        break;
                      case 3:
                        secondEdgeText += "D";
                        break;
                      case 4:
                        secondEdgeText += "E";
                        break;
                    }
                    switch(inspectColumns[loop]) {
                      case 0:
                        secondEdgeText += "A";
                        break;
                      case 1:
                        secondEdgeText += "B";
                        break;
                      case 2:
                        secondEdgeText += "C";
                        break;
                      case 3:
                        secondEdgeText += "D";
                        break;
                      case 4:
                        secondEdgeText += "E";
                        break;
                    }
                    // Add this edge to total edge length
                    totalEdgeLength += tempSmallestNumber
                    // Reset the value of tempSmallestNumber
                    tempSmallestNumber = 0;
                    // Clear that row
                    distanceMatrix[loop2] = ["-", "-", "-", "-", "-"];
                    drawMatrix();
                    inspectColumns[inspectColumns.length] = loop2;
                    // console.log(inspectColumns);
                    for (loop = 0; loop < inspectColumns.length; loop++) {
                      for (loop2 = 0; loop2 < vertexNum; loop2++) {
                        if (typeof(distanceMatrix[loop2][inspectColumns[loop]]) === "number") {
                          tempArray[tempArray.length] = distanceMatrix[loop2][inspectColumns[loop]];
                        }
                      }
                    }
                    // console.log(tempArray);
                    for (loop = 0; loop < tempArray.length; loop++) {
                      for (loop2 = 1; loop2 < tempArray.length; loop2++) {
                        // A bit like Bubblesort or Shuttle Sort Algorithm, but does a few extra (unneccesary) steps
                        // Reason: I'm too lazy to think :p
                        if (tempArray[loop2] < tempArray[loop2 - 1]) {
                          // Swap the 2 values
                          temp1 = tempArray[loop2 - 1];
                          temp2 = tempArray[loop2];
                          tempArray[loop2] = temp1;
                          tempArray[loop2 - 1] = temp2;
                        }
                      }
                    }
                    tempSmallestNumber = tempArray[0];
                    tempArray = [];  // Empty Array
                    // console.log(tempSmallestNumber);
                    for (loop = 0; loop < inspectColumns.length; loop++) {
                      for (loop2 = 0; loop2 < vertexNum; loop2++) {
                        if (typeof(distanceMatrix[loop2][inspectColumns[loop]]) === "number") {
                          if (tempSmallestNumber !== distanceMatrix[loop2][inspectColumns[loop]] || alreadyDone3 === true) {
                            console.log("Either this entry does not contain the smallest number or the smallest number has been found already.");
                          } else {
                            alreadyDone3 = true;
                            // Mark down which edge was chosen
                            switch(loop2) {
                              case 0:
                                thirdEdgeText += "A";
                                break;
                              case 1:
                                thirdEdgeText += "B";
                                break;
                              case 2:
                                thirdEdgeText += "C";
                                break;
                              case 3:
                                thirdEdgeText += "D";
                                break;
                              case 4:
                                thirdEdgeText += "E";
                                break;
                            }
                            switch(inspectColumns[loop]) {
                              case 0:
                                thirdEdgeText += "A";
                                break;
                              case 1:
                                thirdEdgeText += "B";
                                break;
                              case 2:
                                thirdEdgeText += "C";
                                break;
                              case 3:
                                thirdEdgeText += "D";
                                break;
                              case 4:
                                thirdEdgeText += "E";
                                break;
                            }
                            // Add this edge to total edge length
                            totalEdgeLength += tempSmallestNumber
                            // Reset the value of tempSmallestNumber
                            tempSmallestNumber = 0;
                            // Clear that row
                            distanceMatrix[loop2] = ["-", "-", "-", "-", "-"];
                            drawMatrix();
                            inspectColumns[inspectColumns.length] = loop2;
                            // console.log(inspectColumns);
                            for (loop = 0; loop < inspectColumns.length; loop++) {
                              for (loop2 = 0; loop2 < vertexNum; loop2++) {
                                if (typeof(distanceMatrix[loop2][inspectColumns[loop]]) === "number") {
                                  tempArray[tempArray.length] = distanceMatrix[loop2][inspectColumns[loop]];
                                }
                              }
                            }
                            // console.log(tempArray);
                            for (loop = 0; loop < tempArray.length; loop++) {
                              for (loop2 = 1; loop2 < tempArray.length; loop2++) {
                                // A bit like Bubblesort or Shuttle Sort Algorithm, but does a few extra (unneccesary) steps
                                // Reason: I'm too lazy to think :p
                                if (tempArray[loop2] < tempArray[loop2 - 1]) {
                                  // Swap the 2 values
                                  temp1 = tempArray[loop2 - 1];
                                  temp2 = tempArray[loop2];
                                  tempArray[loop2] = temp1;
                                  tempArray[loop2 - 1] = temp2;
                                }
                              }
                            }
                            tempSmallestNumber = tempArray[0];
                            tempArray = [];  // Empty Array
                            // console.log(tempSmallestNumber);
                            for (loop = 0; loop < inspectColumns.length; loop++) {
                              for (loop2 = 0; loop2 < vertexNum; loop2++) {
                                if (typeof(distanceMatrix[loop2][inspectColumns[loop]]) === "number") {
                                  if (tempSmallestNumber !== distanceMatrix[loop2][inspectColumns[loop]] || alreadyDone4 === true) {
                                    console.log("Either this entry does not contain the smallest number or the smallest number has been found already.");
                                  } else {
                                    alreadyDone4 = true;
                                    // Mark down which edge was chosen
                                    switch(loop2) {
                                      case 0:
                                        fourthEdgeText += "A";
                                        break;
                                      case 1:
                                        fourthEdgeText += "B";
                                        break;
                                      case 2:
                                        fourthEdgeText += "C";
                                        break;
                                      case 3:
                                        fourthEdgeText += "D";
                                        break;
                                      case 4:
                                        fourthEdgeText += "E";
                                        break;
                                    }
                                    switch(inspectColumns[loop]) {
                                      case 0:
                                        fourthEdgeText += "A";
                                        break;
                                      case 1:
                                        fourthEdgeText += "B";
                                        break;
                                      case 2:
                                        fourthEdgeText += "C";
                                        break;
                                      case 3:
                                        fourthEdgeText += "D";
                                        break;
                                      case 4:
                                        fourthEdgeText += "E";
                                        break;
                                    }
                                    // Add this edge to total edge length
                                    totalEdgeLength += tempSmallestNumber
                                    // Reset the value of tempSmallestNumber
                                    tempSmallestNumber = 0;
                                    // Clear that row
                                    distanceMatrix[loop2] = ["-", "-", "-", "-", "-"];
                                    drawMatrix();
                                    inspectColumns[inspectColumns.length] = loop2;
                                    // console.log(inspectColumns);
                                    document.getElementById("mainPanel").style.display = "none";
                                    document.getElementById("findMST").style.display = "block";
                                    document.getElementById("mstEdges").innerHTML = firstEdgeText + ", " + secondEdgeText + ", " + thirdEdgeText + ", " + fourthEdgeText;
                                    document.getElementById("mstWeight").innerHTML = totalEdgeLength;
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  } else {
    console.log("This program can currently only deal with graphs of 4 or 5 vertices.  Sorry for the inconvenience.");
  }
}
