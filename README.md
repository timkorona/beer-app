The coding exercise – hit a REST endpoint and display the results.

- Use REACT, and material design via the Material-UI library (https://mui.com/components/)
- The REST endpoint is one for BrewDog brewery. (https://api.punkapi.com/v2/beers?per_page=80)
- It will return JSON describing their various beers.

Here’s the data to display:

  - Name
  - Tagline
  - Description
  - Image
  - ABV
  - IBU

Here are some additional requirements:

  - Display a warning of some sort if the beer contains lactose
  - HI-lite in some way if the beer is dry hopped
  - Sort the results by ABV, in descending order.


Assumptions:

  - A beer containing lactose is identified by the field 'twist' containing the word "lactose"
  - A beer is considered dry hopped if one of the ingredients is "dry hop"