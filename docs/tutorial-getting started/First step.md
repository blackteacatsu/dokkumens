---
sidebar_position: 1
---

# Introduction to NetCDF files & Python 

## What are netCDF files?

Network Common Data Form (netCDF) is a platform-independent data formats that facilitate the creation, access, and sharing of array-based scientific data, developed by the Unidata program at the University Corporation for Atmospheric Research (UCAR). 

NetCDF is commonly used for storing data from climate models, weather observations, satellite images, and other geospatial datasets. Its capability to manage large, complex datasets and promote data sharing and interoperability makes it a valuable tool for scientific research and data analysis.


### Key features according to UCAR:
1. **Self-Describing**: NetCDF files contain metadata that describe their content and structure, making them easier to understand and utilize without external documentation.
2. **Portable**: The format is designed to be machine-independent, ensuring compatibility and readability across different computing systems.
3. **Efficient Data Access**: NetCDF allows for efficient handling of large datasets, enabling users to read subsets of data without loading the entire dataset into memory.
4. **Multidimensional Arrays**: It supports the storage of multidimensional data arrays, essential for representing complex scientific data such as time series, spatial grids, and layered structures.
5. **Rich Metadata**: Users can store detailed metadata along with the data, including units, descriptions, and relationships between variables.
   
This tutorial will demonstrate how to the fundamental handling of NetCDF (.nc) files using Python libraries.

## Reading NetCDF files using the Xarray

### Installation
Copy and the run the following command inside your terminal,
```terminal title="powershell"
pip install xarray
```
:::info
If you don't have `pip` installed, then go [here](https://pip.pypa.io/en/stable/installation/)
:::

### Read a netCDF file using Xarray

```python
import xarray as xr

dataset_path = "~\...\example.nc"

dataset = xr.opendataset(dataset_path)

print(dataset) # call dataset stored in RAM
```

And the output should looks like the following,

```terminal title="Python 3"
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
Another popular python library used to process netCDDF files are netcdf

### Installation 
Run the following command in your terminal
```terminal title="powershell"
pip install netCDF4
```
### Reading netCDF files using netCDF4

```python
import netCDF4 as nc

data_path ="~\...\example.nc"

data = nc.Dataset(data_path)

data
```

```terminal title="Python 3"
<class 'netCDF4._netCDF4.Dataset'>
root group (NETCDF4 data model, file format HDF5):
    missing_value: -9999.0
    NUM_SOIL_LAYERS: 4
    SOIL_LAYER_THICKNESSES: [ 10.        30.000002  60.000004 100.      ]
    title: LIS land surface model output
    institution: NASA GSFC
    source: 
    history: created on date: 2023-09-29T07:57:03.619
    references: Kumar_etal_EMS_2006, Peters-Lidard_etal_ISSE_2007
    conventions: CF-1.6
    comment: website: http://lis.gsfc.nasa.gov/
    MAP_PROJECTION: EQUIDISTANT CYLINDRICAL
    SOUTH_WEST_CORNER_LAT: -20.975
    SOUTH_WEST_CORNER_LON: -81.975
    DX: 0.05
    DY: 0.05
    dimensions(sizes): time(31), north_south(540), east_west(660), SoilMoist_profiles(4), SoilTemp_profiles(4)
    variables(dimensions): float32 lat(time, north_south, east_west), float32 lon(time, north_south, east_west), float32 time(time), float32 Swnet_tavg(time, north_south, east_west), float32 Lwnet_tavg(time, north_south, east_west), float32 Qle_tavg(time, north_south, east_west), float32 Qh_tavg(time, north_south, east_west), float32 Qg_tavg(time, north_south, east_west), float32 Snowf_tavg(time, north_south, east_west), float32 Rainf_tavg(time, north_south, east_west), float32 Evap_tavg(time, north_south, east_west), float32 Qs_tavg(time, north_south, east_west), float32 Qsb_tavg(time, north_south, east_west), float32 Qsm_tavg(time, north_south, east_west), float32 Albedo_inst(time, north_south, east_west), float32 SWE_inst(time, north_south, east_west), float32 SoilMoist_inst(time, SoilMoist_profiles, north_south, east_west), float32 SoilTemp_inst(time, SoilTemp_profiles, north_south, east_west), float32 PotEvap_tavg(time, north_south, east_west), float32 ECanop_tavg(time, north_south, east_west), float32 TVeg_tavg(time, north_south, east_west), float32 ESoil_tavg(time, north_south, east_west), float32 WaterTableD_inst(time, north_south, east_west), float32 TWS_inst(time, north_south, east_west), float32 GWS_inst(time, north_south, east_west), float32 Wind_f_tavg(time, north_south, east_west), float32 Tair_f_tavg(time, north_south, east_west), float32 Qair_f_tavg(time, north_south, east_west), float32 Psurf_f_tavg(time, north_south, east_west), float32 SWdown_f_tavg(time, north_south, east_west), float32 LWdown_f_tavg(time, north_south, east_west), float32 LAI_inst(time, north_south, east_west), float32 Greenness_inst(time, north_south, east_west), float64 north_south(north_south), float64 east_west(east_west)
    groups: 

```

