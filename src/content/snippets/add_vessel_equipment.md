---
language: python
highlightLines: 1-4|7-10|13-17|20-23|26-29|32-42
---

```py
def lcc_sabatier_flow():
    stream_in = e2d.project.simulation.streams["H2-C02-2"]
    vol_flow, _ = stream_in.output.total_volume_flow()
    return vol_flow


def lcc_sabatier_rt():
    rplug = e2d.project.simulation.blocks["REACTOR1"]
    residence_time, _ = rplug.output.residence_time()
    return residence_time


def lcc_sabatier_ld():
    rplug = e2d.project.simulation.blocks["REACTOR1"]
    length, _ = rplug.output.length()
    diameter, _ = rplug.output.diameter()
    return length / diameter


def lcc_sabatier_pres():
    rplug = e2d.project.simulation.blocks["REACTOR1"]
    pressure, _ = rplug.output.pressure_max()
    return pressure


def lcc_sabatier_temp():
    rplug = e2d.project.simulation.blocks["REACTOR1"]
    temperature, _ = rplug.output.temperature_max()
    return temperature


capex.add_vessel(
    name="Methanation reactor",
    volume_flow=lcc_sabatier_flow,
    residence_time=lcc_sabatier_rt,
    length_diameter_ratio=lcc_sabatier_ld,
    pressure=lcc_sabatier_pres,
    temperature=lcc_sabatier_temp,
    vessel_kind="horizontal",
    material="Stainless 304",
    process_type="Fluids",
)
```
