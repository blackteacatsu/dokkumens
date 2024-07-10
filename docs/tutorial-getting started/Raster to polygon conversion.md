# Raster to polygon conversion

This documentation page go through the raster to polygon conversion we used when we put together

:::warning
The method described in this page requires the installation of Esri's ArcGIS Pro and ArcPy library. Select Python kernel to     
:::

```mermaid
---
title: Extracting statistics by Shapefiles from netCDF(.nc) files using ArcPy 
---
flowchart TD
    A[(Example.nc)] -->|set as ''in_multidimensional_raster''| B([arcpy.md.MakeMultidimensionalRasterLayer])--> C{{Example.nc's 
    Raster Layer}}
    D[(Example Polygon
    Shapefile)] --> |set as ''in_zone_data''| E([arcpy.sa.ZonalStatisticsAsTable])
    
    C -->|set as ''in_value_raster''| E
     
    E -->|to find zonal average, 
    set ''statistics_type='MEAN_STD' ''| F{{Example.csv}}

    F -->|set as ''join_table''| G([arcpy.management.AddJoin])

    D -->|set as ''in_layer_or_view''| G

    G --> H{{Temporary/in memory join
    bewteen Example.csv & Example Shapefile}}

    H -->|set as ''in_features''| I([arcpy.management.CopyFeatures])

    I --> J{{Permenantly joined feature class}}
```

```python VSCode
for anomaly_vars, nc_path in combined_nc_with_vars.items():
    output_layer_name = "LIS_HIST_2001_to_2023_Monthly_" + anomaly_vars

    # Import NetCDF as raster layer
    arcpy.md.MakeMultidimensionalRasterLayer(
    in_multidimensional_raster=nc_path,
    out_multidimensional_raster_layer= output_layer_name,
    variables=anomaly_vars,
    dimension_def="ALL",
    dimension_ranges=None,
    dimension_values=None,
    dimension="",
    start_of_first_iteration="",
    end_of_first_iteration="",
    iteration_step=None,
    iteration_unit="",
    template='-82 -20.9999999999981 -49.0000000000019 6.00000000000038 GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]]',
    dimensionless="DIMENSIONS",
    spatial_reference=None
    )

    print(f"Created and saved multidimensional raster layer for variable: {anomaly_vars}") # Check if the import process is complete

    # Calculate zonal statistic as table by polygon 
    arcpy.sa.ZonalStatisticsAsTable(
    in_zone_data=r"C:\Users\Kris\Documents\ArcGIS\Projects\amazon_ldas_netcdf_to_vector\amazon_ldas_netcdf_to_vector.gdb\hybas_sa_lev05_areaofstudy",
    zone_field="PFAF_ID",
    in_value_raster= output_layer_name,
    out_table=r"C:\Users\Kris\Documents\ArcGIS\Projects\amazon_ldas_netcdf_to_vector\amazon_ldas_netcdf_to_vector.gdb\ZonalSt_hybas_lev05_" + anomaly_vars,
    ignore_nodata="DATA",
    statistics_type="MEAN_STD",
    process_as_multidimensional="ALL_SLICES",
    percentile_values=90,
    percentile_interpolation_type="AUTO_DETECT",
    circular_calculation="ARITHMETIC",
    circular_wrap_value=360,
    out_join_layer="",
    )
```
### Appending csv files to an exisiting polygon feature class

**Step 0**: Validate Join

```python
arcpy.management.ValidateJoin(
    in_layer_or_view="hybas_sa_lev05_areaofstudy",
    in_field="PFAF_ID",
    join_table="ZonalSt_hybas_lev05_Qs_tavg_anomaly",
    join_field="PFAF_ID",
)
```
Terminal output should show the following:

```shell
Messages
Start Time: July 4, 2024 7:34:30 PM
Checking for invalid characters...
Checking workspaces...
Checking for field indexes...
The join field PFAF_ID in the table amazon_ldas_netcdf_to_vector.ZonalSt_hybas_lev05_Qs_tavg_anomaly is not indexed. To improve performance, we recommend that an index be created.
Checking for OIDs...
Checking for join cardinality (1:1 or 1:m joins)...
A one - to - many join has created 41400 records from 150 matches.
The input table has 151 and the join table has 41400 records.
Succeeded at July 4, 2024 7:34:31 PM (Elapsed Time: 0.84 seconds)
```

We know that performing a join operation through this way is successful since, it suggested that resulting attribute table will have 41400 data entries.

***Step 1***

```python
for vars, table in combined_csv_with_vars.items():

    arcpy.management.AddJoin(
    in_layer_or_view="hybas_sa_lev05_areaofstudy",
    in_field="PFAF_ID",
    join_table=table,
    join_field="PFAF_ID",
    join_type="KEEP_ALL",
    index_join_fields="NO_INDEX_JOIN_FIELDS",
    rebuild_index="NO_REBUILD_INDEX",
    join_operation="JOIN_ONE_TO_MANY"
) 
    
    arcpy.management.CopyFeatures(
    in_features="hybas_sa_lev05_areaofstudy",
    out_feature_class=r"C:\Users\Kris\Documents\ArcGIS\Projects\amazon_ldas_netcdf_to_vector\amazon_ldas_netcdf_to_vector.gdb\hybas_sa_lev05_anomaly_of_" + vars,
    config_keyword="",
    spatial_grid_1=None,
    spatial_grid_2=None,
    spatial_grid_3=None
)
    print(f"Anomaly shapefile created for: {vars}")
    
    arcpy.management.RemoveJoin(
    in_layer_or_view="hybas_sa_lev05_areaofstudy",
    join_name=""
)
```