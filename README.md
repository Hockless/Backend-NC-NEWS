# NC News -- Backend

This is the backend for the online aggregation site 'NC News'. 
## Installation

To use, please fork and clone this repository. Then please run 'npm i' to install the dependencies. 
```bash
npm i
```
You will then need to create two .env files in the route directory:

```python
.env.development
.env.test
```
For the development file, please add:
```bash
PGDATABASE=nc_news
```
For the test file, please add:
```bash
PGDATABASE=nc_news_test
```
Make sure to save both files when you have done this.


## Usage

To seed the database, use the following command:
```
npm run seed
```
To perform a test, use the following command:
```
npm t
```

## Notes
Please make sure to update Node.js to at least version 14.18.0  and Postgres to at least version 14.1.
