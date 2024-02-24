---
language: python
highlightLines: 1|4-11|14-22
---

```py
capex = e2d.project.lcc.capex


def lcc_kW_electrolyzer():
    h2_in = e2d.project.simulation.streams["H2"]
    h2_in_mass_flow, _ = h2_in.output.total_mass_flow()
    h2_rec = e2d.project.simulation.streams["H2-REC"]
    h2_rec_mass_flow, _ = h2_rec.output.total_mass_flow()
    h2_mass_flow = h2_in_mass_flow - h2_rec_mass_flow

    return h2_mass_flow * 44.7


capex.add_scaled_equipment(
    name="Electrolyzer",
    capacity=lcc_kW_electrolyzer,
    reference_capacity=1,
    reference_cost=175,
    scaling_factor=1,
    process_type="Fluids",
    year=2015,
)
```
