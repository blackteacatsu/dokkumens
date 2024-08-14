---
title: Assigning coordinates to dimensions in netCDF files
sidebar_position: 2
---

## Introduction

During the previous session, we are able to access the metadata within our netCDF files, however we didn't perform any 

```
<xarray.Dataset>
Dimensions:           (time: 1, north_south: 250, east_west: 360,
                       SoilMoist_profiles: 4, SoilTemp_profiles: 4)
Coordinates:
  * time              (time) datetime64[ns] 2012-01-03
Dimensions without coordinates: north_south, east_west, SoilMoist_profiles,
                                SoilTemp_profiles
Data variables: (12/32)
    lat               (time, north_south, east_west) float32 ...
    lon               (time, north_south, east_west) float32 ...
    Swnet_tavg        (time, north_south, east_west) float32 ...
    Lwnet_tavg        (time, north_south, east_west) float32 ...
    Qle_tavg          (time, north_south, east_west) float32 ...
    Qh_tavg           (time, north_south, east_west) float32 ...
    ...                ...
    Qair_f_tavg       (time, north_south, east_west) float32 ...
    Psurf_f_tavg      (time, north_south, east_west) float32 ...
    SWdown_f_tavg     (time, north_south, east_west) float32 ...
    LWdown_f_tavg     (time, north_south, east_west) float32 ...
    LAI_inst          (time, north_south, east_west) float32 ...
    Greenness_inst    (time, north_south, east_west) float32 ...
Attributes: (12/17)
    CDI:                     Climate Data Interface version 1.9.10 (https://m...
    Conventions:             CF-1.6
    institution:             NASA GSFC
    missing_value:           -9999.0
    NUM_SOIL_LAYERS:         4
    SOIL_LAYER_THICKNESSES:  [ 10.        30.000002  60.000004 100.      ]
    ...                      ...
    MAP_PROJECTION:          EQUIDISTANT CYLINDRICAL
    SOUTH_WEST_CORNER_LAT:   6.525
    SOUTH_WEST_CORNER_LON:   -94.475
    DX:                      0.05
    DY:                      0.05
    CDO:                     Climate Data Operators version 1.9.10 (https://m...
```
Notice, there is a problem with this dataset which could potentially cause an issue if we map these gridded data in software like ArcGIS. The line below `*time` is telling our dimension `north_east` and `east_west` do not have coordinates associated with them.

## Python Scripting
### Initialization
```python title="main.py"
import netCDF4 as nc
import numpy as np
```

### Scripting
```python title
with nc.Dataset('~\example.nc', 'a') as nc_file:
    # Define coordinates for the dimensions without coordinates
    north_south_coords = np.linspace(6.5, 18.95, num=250)  # Example coordinates for "north_south" dimension
    east_west_coords = np.linspace(-94.5, -76.55, num=360)  # Example coordinates for "east_west" dimension

    # Create variables for the coordinates
    north_south_var = nc_file.createVariable('north_south', 'f8', ('north_south',), fill_value=np.nan)
    east_west_var = nc_file.createVariable('east_west', 'f8', ('east_west',), fill_value=np.nan)

    # Assign coordinates to the variables
    north_south_var[:] = north_south_coords
    east_west_var[:] = east_west_coords

    # Set attributes for the coordinate variables (if necessary)
    north_south_var.units = 'degrees_n'
    east_west_var.units = 'degrees_e'

    # Attach the coordinate variables to the dimensions
    nc_file.variables['north_south'] = north_south_var
    nc_file.variables['east_west'] = east_west_var

    # Flush changes to the NetCDF file
    nc_file.sync()
```