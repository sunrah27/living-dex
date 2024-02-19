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