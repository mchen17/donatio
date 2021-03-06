Site Location

http://markromanmiller.com/donatio/


direct page to /clear.html to clear session data for development

# Deadlines

* User feedback round 1 - (Monday)
* Mood board - Done
* Poster - (Wednesday)
* Pitch Slide - (Wednesday)
* Coding all functionality - (Wednesday 5PM)
* Final coding - (Thursday 5PM)
* Video - (Thursday)
* Final Report - (Friday)

# TODO  - Demo Day
* General (All)
 * [ ] Cart display should work
 * [x] Add discovery page to navigate to causes - Done
 * [ ] Add triangle back to search bar
 * [ ] Standardize menu tabs spacing
 * [x] Create separate page to clear session data instead of index page (Matt) - Done

* Causes (Lindsey)
 * [x] left-align front page text - done
 * [x] add padding to cause text - done

* Search Page (Mark)
 * [x] Limit results to 10 per page - Done
 * [x] Search can be filtered - Done
 * [x] activate filter buttons - Done
 * [x] Dynamically generate filter list - Done
 * [x] Format subcategories - Done
 * [x] Search from causes page - Done
 * [x] Add link to other pages of results - Done
 * [x] add substring search filter tags - Done
 * [x] make sure the filters launch correctly from causes page - .5h
 * [x] remove the filters section - .2h
 * [x] Limit size of description for search results - .2h
 * [x] Add link to "more details" page - .2h 
 * [x] Add visual cue to drop down for search results - done
 * [x] Dynamically generate the links to other pages of results - .3h
 * [x] User can also click enter for search - .2h
 * [x] Stars filter should work - .5h
 * ---- the rest of this is unordered ---
 * [ ] Save search state across tabs - .3h
 * [ ] Generated details table data should be somewhat sensible - .5h
 * ---- nice to have ----
 * [ ] Add to cart from search page - .3h
 * [ ] have a short description of all active filters - .3h
 * [ ] Implement filter charity counts - .5h

* Donate Page (Lindsey)
 * [x] Finalize slider display - done
 * [x] Link to do actual session - done
 * [x] Center family images and update spacing - done
 * [ ] get new image for family icon?
 * [ ] change pie chart outer and inner labels?
 
* Details (Matt)
 * [x] At a glance - Done
 * [x] Decrease the size of the display picture - Done
 * [x] Add padding to contentview of details page - Done
 * [x] Financials (Lindsey) - done
 
* Comparison(Matt)
 * [x] Default select first four charities - done
 * [x] Fix z order of filter bar (Lindsey) - done
 
# Local Setup

The use of javascript to import other documents will only work when running an http server from this directory. One way to run an http server from your local machine is found here

https://www.npmjs.com/package/http-server

To preview changes locally you will need to disable your browser cache. On chrome this can be found on the network tab of the web developers tab. There should be a checkbox to diable cache.

# Data Schema Specification
The following variables will be stored in the user session through javascript

* searchString : String - represents the string that the user places in the main charity search bar
* searchFilters : Dictionary - mapping between filter category and user selected filters
* savedCharities : Array - list of charityIds that the user has in their cart at the current moment
* comparisonMetrics : Array - list of strings that correspond to comparison metrics selected
* comparisonCharities : Array - list of charity ids that correspond the the charities that are selected on the comparison page
* allocationAmounts : Dictionary - mappng between charityIds that have nonzero allocation and percent allocation

The following variables will be stored statically for this demo

* charityDetails : Dictionary - mapping from charityId to json like object with all details from that charity
* detailsJson - 
  * id : Number - unique identifier associated with the charitiy
  * name : String - name of charity
  * mainPhoto : String - url to charity logo photo
  * website : String - url to charity main website
  * mission : String - mission statement diplayed on details page
  * leadershipTeam : Array - dictionary of leadership data
  * ...

# Known issues
* race condition where static content is needs to finish loading prior to intialization of elements on compare page otherwise the site crashes
