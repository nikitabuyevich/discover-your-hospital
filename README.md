# Discover Your Hospital

A live demonstration of the website is available at [discoveryourhospital.com](http://discoveryourhospital.com/).

This project was initially developed by [Nikita Buyevich](https://www.linkedin.com/in/nikitabuyevich/) and [Danny Yoon](https://github.com/syoon46) in 36 hours at [HackIllinois 2018](https://hackillinois.org/).

This project was the runner up winner of the "Grow Your Future" award presented by [John Deere](https://www.deere.com/en/index.html) at [HackIllinois 2018](https://hackillinois.org/).

## Architecture

The project ingested the public hospital patient survey API [HCAHPS](https://dev.socrata.com/foundry/data.medicare.gov/rmgi-5fhi).

For ease of use, the web service platform is AWS. Everything is build around it.

* [AWS RDS](https://aws.amazon.com/rds/) for the PostgresSQL DB.
* [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) for the .NET Core 2.0 back-end.
* [AWS S3](https://aws.amazon.com/s3/) bucket for the Angular static web hosting front-end.

In terms of the data manipulation, Python was used as the primary source.

* [Folium](https://github.com/python-visualization/folium) for the data visualization.
* [Leaflet.JS Maps](https://folium.readthedocs.io/en/latest/) to display the visualized data on a map.

## Future Expansion

This project was the initial start of the basic needs that are met when an individual wants to answer the question of `Which hospital best meets my needs based on certain limited categories`.

There is a lot of infrastructure here for future expansion. Here are some quick ideas that were mentioned to us when we presented the project.

* **Insurance**. Hospitals that don't support the type of insurance a user has means that the results displayed by Discover Your Hospital are useless to them. Being able to filter out hospitals that only apply to the user is perhaps the next best feature to work on.
* **More interesting data manipulation**. The ingested data provided by the HCAHPS had a lot of interesting columns which we filtered out to display our basic results. A potential expansion to this project would be to take a look at that data and try to create a model for it. To answer more interesting questions about hospitals that might not be present on the surface.
* **Essential support**. Similar to insurance, it's important to a user to be able to filter out hospitals that don't meet their certain criteria. Perhaps they need a pool for their recommended daily exercise and a hospital not having one, is a deal breaker for some.

## Development

Interested in working on this project? Great. This project is completely open source. Feel free to use it as you see fit.

## License

MIT License
