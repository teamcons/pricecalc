
FEATURES:

- The price list is a cleaned export from XTRF.
- Under 45: Display 45€ for minimum charge
- As per Astrid request, reduce by 1cts
- Errors loading are displayed


INSTRUCTIONS to test price calculator:

 - Download the ZIP by clicking on Code -> Download Zip
 - Extract the archive
 - Install Python in windows Store
 - Open powershell console
 - Change to folder with the price calculator
 - (If in download folder, paste and edit this command: "cd C:\Users\YOURUSERNAME\Downloads\pricecalc")
 - Run "python3 -m http.server"
 - Go in your browser to "http://localhost:8000/pricecalculator.html"


CLEAN THE PRICE LIST:

 - Only select TEP as job type for export
 - Export as csv with ; as delimiter
 - Delete any useless line at start
 - Delete useless columns
 - Split first column in two using the arrow symbol as delimiter
 - Replace regional variants to generic counterparts
 - Search and replace "," to "." (javascript calculates decimals with period)


 Javascript reads:
 - First column as source
 - Second column as target
 - Third column for price

 Technically this could be set up to pull from XTRF.
 Any pretty formatting around can also be done.