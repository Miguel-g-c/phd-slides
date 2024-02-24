---
language: python
highlightLines: 1-7|10-13|16-19|22-26|29-41
---

```py
def h2_co2_ratio(var: float) -> float:
    h2_in = e2d.project.simulation.streams["H2"]
    h2_in_mole_flow, _ = h2_in.output.total_flow(basis="MOLE")
    co2_in = e2d.project.simulation.streams["C02"]
    co2_in_flow = h2_in_mole_flow / var
    co2_in.inputs.total_flow(value=co2_in_flow, basis="MOLE", unit="kmol/hr")
    return var


def reactor_temp(var: float) -> float:
    rplug = e2d.project.simulation.blocks["REACTOR1"]
    rplug.inputs.temperature(value=var, unit="C")
    return var


def reactor_length(var: float) -> float:
    rplug = e2d.project.simulation.blocks["REACTOR1"]
    rplug.inputs.length(value=var, unit="m")
    return var


def reactor_ld_ratio(var: float) -> float:
    rplug = e2d.project.simulation.blocks["REACTOR1"]
    length, _ = rplug.output.length()
    rplug.inputs.diameter(value=length / var, unit="m")
    return var


def working_fluid(var: int) -> int:
    working_fluid = e2d.project.simulation.streams["WFLUID-1"]
    h2o = working_fluid.composition["H20"]
    cyclopentane = working_fluid.composition["CYCLOPEN"]

    if var == 0:
        h2o.inputs.flow(value=1, basis="MOLE-FRAC")
        cyclopentane.inputs.flow(value=0, basis="MOLE-FRAC")
    else:
        h2o.inputs.flow(value=0, basis="MOLE-FRAC")
        cyclopentane.inputs.flow(value=1, basis="MOLE-FRAC")

    return var
```
