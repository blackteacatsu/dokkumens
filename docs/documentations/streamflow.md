---
title: Streamflow
---

## Description
**Unit:  **

m^3 s^-1

## Retrospective  Data
Unlike other variables, the raster to polygon conversion on the streamflow data is carried out by setting stats type to maximum. Because
```python
# Calculate zonal statistic as table by polygon 
arcpy.sa.ZonalStatisticsAsTable(
    ...
    statistics_type="MAX",
    ...)
```