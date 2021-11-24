import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import fetchMock from 'fetch-mock';
import Button from '@mui/material/Button';

const beerList = [
  {
    "id": 1,
    "name": "Buzz",
    "tagline": "A Real Bitter Experience.",
    "description": "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
    "image_url": "https://images.punkapi.com/v2/keg.png",
    "abv": 4.5,
    "ibu": 60,
    "method": {
      "twist": "Do the lactose twist."
    },
    "ingredients": {
      "hops": [
        {
          "add": "start",
        },
        {
          "add": "start",
        }
      ]
    }
  },
  {
    "id": 2,
    "name": "Buzz2",
    "tagline": "A Real Bitter Experience.",
    "description": "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
    "image_url": "https://images.punkapi.com/v2/keg.png",
    "abv": 4.5,
    "ibu": 60,
    "method": {
      "twist": "No L-word here."
    },
    "ingredients": {
      "hops": [
        {
          "add": "start",
        },
        {
          "add": "dry hop",
        }
      ]
    }
  }
];
fetchMock.mock('https://api.punkapi.com/v2/beers?per_page=80', {
  data: beerList,
  status: 200
});

afterEach(() => {
  fetchMock.restore();
})

test('renders button for retrieving list of beers', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button', { name: 'Get List of Beers' });
  expect(buttonElement).toBeInTheDocument();
});

test('renders table of beers', () => {
  render(<App />);
  const tableContainerElement = screen.getByRole('table', { name: 'list of beers' });
  expect(tableContainerElement).toBeInTheDocument();
});

test('renders Image column', () => {
  render(<App />);
  const imageColumnElement = screen.getByRole('columnheader', { name: 'Image' });
  expect(imageColumnElement).toBeInTheDocument();
});

test('renders Name of Beer column', () => {
  render(<App />);
  const nameColumnElement = screen.getByRole('columnheader', { name: 'Name of Beer' });
  expect(nameColumnElement).toBeInTheDocument();
});

test('renders Beer Tagline column', () => {
  render(<App />);
  const taglineContainerElement = screen.getByRole('columnheader', { name: 'Beer Tagline' });
  expect(taglineContainerElement).toBeInTheDocument();
});

test('renders Description column', () => {
  render(<App />);
  const descriptionColumnElement = screen.getByRole('columnheader', { name: 'Description' });
  expect(descriptionColumnElement).toBeInTheDocument();
});

test('renders ABV column', () => {
  render(<App />);
  const abvColulmnElement = screen.getByRole('columnheader', { name: 'ABV' });
  expect(abvColulmnElement).toBeInTheDocument();
});

test('renders IBU column', () => {
  render(<App />);
  const ibuColumnElement = screen.getByRole('columnheader', { name: 'IBU' });
  expect(ibuColumnElement).toBeInTheDocument();
});

//I am befuddled as to why using line 115 does not work but line 116 does.
//Line 116 hits jest.fn(), while line 115 appears to hit the actual fetchBeers function.
//Line 115 gives a message stating absence of the jest.fn() for the fetch results in the
//actual fetch being hit but jest.fn() is there, what am I missing?
test('call fetchBeers when Get List of Beers button clicked', () => {
  const fetchBeers = jest.fn();
  render(<App />);
  // render(<Button variant="contained" onClick={fetchBeers}>Get List of Beers</Button>);
  const button = screen.getByRole('button', { name: 'Get List of Beers' });
  expect(button).toBeInTheDocument();
  fireEvent.click(button);
  expect(fetchBeers).toHaveBeenCalled();
});

// test('displays alert warning if beer contains lactose', () => {
// });

// test('does NOT display alert warning if beer does NOT contain lactose', () => {
// });

// test('displays info alert if one of the ingredients is "dry hop"', () => {
// });

// test('does NOT display info alert if no "dry hop" ingredient', () => {
// });
