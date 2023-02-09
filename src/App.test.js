import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

const beerList = [
  {
    "id": 1,
    "name": "Buzz",
    "tagline": "A Real Bitter Experience.",
    "description": "Beer description text.",
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
          "add": "dry hop",
        }
      ]
    }
  }
]

const beerNoWarningsOrAlerts = [
  {
    "id": 2,
    "name": "Another Buzz",
    "tagline": "Another Bitter Experience.",
    "description": "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
    "image_url": "https://images.punkapi.com/v2/keg.png",
    "abv": 5.5,
    "ibu": 65,
    "method": {
      "twist": "No L-word here."
    },
    "ingredients": {
      "hops": [
        {
          "add": "start",
        }
      ]
    }
  }
]

describe('WHEN: the beer list table is first rendered', () => {
  beforeEach(() => {
    render(<App />);
  });
  
  it('THEN: renders the table of beers', () => {
    const tableContainerElement = screen.queryByRole('table', { name: 'list of beers' });
    expect(tableContainerElement).toBeInTheDocument();
  });
  
  it('THEN: renders the Image column', () => {
    const imageColumnElement = screen.queryByRole('columnheader', { name: 'Image' });
    expect(imageColumnElement).toBeInTheDocument();
  });
  
  it('THEN: renders the Name of Beer column', () => {
    const nameColumnElement = screen.queryByRole('columnheader', { name: 'Name of Beer' });
    expect(nameColumnElement).toBeInTheDocument();
  });
  
  it('THEN: renders the Beer Tagline column', () => {
    const taglineContainerElement = screen.queryByRole('columnheader', { name: 'Beer Tagline' });
    expect(taglineContainerElement).toBeInTheDocument();
  });
  
  it('THEN: renders the Description column', () => {
    const descriptionColumnElement = screen.queryByRole('columnheader', { name: 'Description' });
    expect(descriptionColumnElement).toBeInTheDocument();
  });
  
  it('THEN: renders the ABV column', () => {
    const abvColulmnElement = screen.queryByRole('columnheader', { name: 'ABV' });
    expect(abvColulmnElement).toBeInTheDocument();
  });
  
  it('THEN: renders the IBU column', () => {
    const ibuColumnElement = screen.queryByRole('columnheader', { name: 'IBU' });
    expect(ibuColumnElement).toBeInTheDocument();
  });
});

describe('WHEN: the Get List of Beers button is clicked', () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(beerList)
  }));
  
  beforeEach(() => {
    render(<App />);
    const button = screen.queryByRole('button', { name: 'GET LIST OF BEERS' });
    fireEvent.click(button);
  });
  
  it('THEN: renders the beer iamge', async () => {
    const displayedImage = screen.queryByAltText('alt_text');
    await expect(displayedImage.src).toContain('https://images.punkapi.com/v2/keg.png');
  });
  
  it('THEN: renders the name of the beer', async () => {
    await expect(screen.queryByText('Buzz')).toBeInTheDocument();
  });
  
  it('THEN: renders the tagline for the beer', async () => {
    await expect(screen.queryByText('A Real Bitter Experience.')).toBeInTheDocument();
  });
  
  it('THEN: renders the description of the beer', async () => {
   await expect(screen.queryByText('Beer description text.')).toBeInTheDocument();
  });
  
  it('THEN: renders the ABV of the beer', async () => {
    await expect(screen.queryByText('4.5')).toBeInTheDocument();
  });
  
  it('THEN:renders the IBU of the beer', async () => {
    await expect(screen.queryByText('60')).toBeInTheDocument();
  });
  
  it('THEN: displays warning if beer contains lactose', async () => {
    await expect(screen.queryByText('Contains Lactose')).toBeInTheDocument();
  });
  
  it('THEN: displays info alert if one of the ingredients is "dry hop"', async () => {
    await expect(screen.queryByText('Dry Hopped')).toBeInTheDocument();
  });
});

describe('WHEN: a beer contains no lactose', () => {
  it('THEN: no warning for lactose is displayed', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(beerNoWarningsOrAlerts)
    }));
    
    render(<App />);
    const button = screen.queryByRole('button', { name: 'GET LIST OF BEERS' });
    fireEvent.click(button);
  
    await expect(screen.queryByText('Contains Lactose')).not.toBeInTheDocument();
  });
});

describe('WHEN: a beer is not dry hopped', () => {
  it('THEN: no alert for dry hopped is displayed', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(beerNoWarningsOrAlerts)
    }));
    
    render(<App />);
    const button = screen.queryByRole('button', { name: 'GET LIST OF BEERS' });
    fireEvent.click(button);
  
    await expect(screen.queryByText('Dry Hopped')).not.toBeInTheDocument();
    });
});
