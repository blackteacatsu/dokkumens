# Introduction to NetCDF Files & Python


This tutorial explains how to read NetCDF (.nc) files using python libraries.

## Reading NetCDF files using the Xarray

### Installation
Inside your machines's terminal type

```terminal title="powershell"
pip install xarray
```

### reading NetCDF files using python

```python
import xarray as xr

dataset_path = "~\...\example.nc"

dataset = xr.opendataset(dataset_path)

print(dataset) # call the dataset which is currently store in RAM
```

The output should looks like the following,

```
<xarray.Dataset>
Dimensions:           (time: 276, lat: 540, lon: 660, SoilMoist_profiles: 4,
                       SoilTemp_profiles: 4)
Coordinates:
  * time              (time) datetime64[ns] 2001-01-31 2001-02-28 ... 2023-12-31
  * lat               (lat) float64 -20.98 -20.93 -20.88 ... 5.875 5.925 5.975
  * lon               (lon) float64 -81.97 -81.92 -81.88 ... -49.08 -49.03
Dimensions without coordinates: SoilMoist_profiles, SoilTemp_profiles
Data variables: (12/30)
    Swnet_tavg        (time, lat, lon) float32 ...
    Lwnet_tavg        (time, lat, lon) float32 ...
    Qle_tavg          (time, lat, lon) float32 ...
    Qh_tavg           (time, lat, lon) float32 ...
    Qg_tavg           (time, lat, lon) float32 ...
    Snowf_tavg        (time, lat, lon) float32 ...
    ...                ...
    Qair_f_tavg       (time, lat, lon) float32 ...
    Psurf_f_tavg      (time, lat, lon) float32 ...
    SWdown_f_tavg     (time, lat, lon) float32 ...
    LWdown_f_tavg     (time, lat, lon) float32 ...
    LAI_inst          (time, lat, lon) float32 ...
    Greenness_inst    (time, lat, lon) float32 ...
Attributes: (12/15)
    missing_value:           -9999.0
    NUM_SOIL_LAYERS:         4
    SOIL_LAYER_THICKNESSES:  [ 10.        30.000002  60.000004 100.      ]
    title:                   LIS land surface model output
    institution:             NASA GSFC
    source:                  
    ...                      ...
    comment:                 website: http://lis.gsfc.nasa.gov/
    MAP_PROJECTION:          EQUIDISTANT CYLINDRICAL
    SOUTH_WEST_CORNER_LAT:   -20.975
    SOUTH_WEST_CORNER_LON:   -81.975
    DX:                      0.05
    DY:                      0.05

```

## Reading NetCDF files using netCDF
### Installation 
In your terminal paste the following command

```terminal title="powershell"
pip install netcdf
```

