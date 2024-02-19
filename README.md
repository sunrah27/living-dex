# living-dex

A personal project to allow Pokemon enthiuests to track their Living Dex progress. Currenly there is no online service that offers anything other then a community maintained google sheet which has become extremely large and crushes often.

My plan is to create an online Pokedex of sorts that offers the Trainers to select what they want to track;
- [ ] Track which Pokemons are available in which Pokemon games
- [ ] Track the various different Pokemon forms
- [ ] Track gender differences between pokemons
- [ ] Track the origin of the different pokemons
- [ ] Add a special Trainer Card that will be created upon registration
- [ ] Completion of different challenges will add a star to the Trainer Card
- [ ] Get details of how to obtain a specific pokemon legitematly 

To do all this I expllored various different options including the Pokemon API. Unfortunately while the API does offer considerable amount of information it does not differentitate between which Pokemons are available in which game. Hoever, I did find this information on a Bulbapedia webpage. To obtain this data I wrote a simple Python script that saved the table data into CSV files;

```Python
import csv
import requests
from bs4 import BeautifulSoup
def scrapeTables(url):
    # Send a GET request to the URL
    response = requests.get(url)
    # Parse HTML content
    soup = BeautifulSoup(response.content, 'html.parser')
    # Find all tables in the page
    tables = soup.find_all('table')
    # Loop through each table and write its contents to a CSV file
    for index, table in enumerate(tables):
        filename = f"table_{index + 1}.csv"
        with open(filename, mode='w', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            rows = table.find_all('tr')
            for row in rows:
                columns = row.find_all(['td', 'th'])
                writer.writerow([column.get_text(strip=True) for column in columns])
        print(f"Table {index + 1} has been exported to {filename}.")
scrapeTables("https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_availability")
```
I went through each of the CSV file making necesssary changes and consolidating the different files into one. The table only lists which game a pokemon is available in along with it's Galrarian and Aloan forms. I still need to add the gender and few other forms that are obtainable. I also need to create an evolution link between the different pokemons.

Once done I will convert the consolidate CSV file into a Mongo DB and build the frontend. I have not decided weather to use Python or React for the final product.