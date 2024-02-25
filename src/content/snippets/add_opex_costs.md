---
language: python
highlightLines: 1|3-5|7|9|12-19|22-24
---

```py
opex = e2d.project.lcc.opex

opex.operating_labour(
    positions=4, employees=4.8, salary=30000, interannual_variance=0.015
)

opex.loan(percent=0.6, interest=0.04, years=10)

opex.depreciation(type="linear", value=0.07, residual_value=0)


def lcc_co2():
    co2_in = e2d.project.simulation.streams["C02"]
    co2_in_mass_flow, _ = co2_in.output.total_mass_flow()
    co2_rec = e2d.project.simulation.streams["C02-REC"]
    co2_rec_mass_flow, _ = co2_rec.output.total_mass_flow()
    co2_mass_flow = co2_in_mass_flow - co2_rec_mass_flow
    f = e2d.project.capacity_factor()
    return co2_mass_flow / 1000 * f * 8760


opex.add_raw_material(
    name="C02", quantity=lcc_co2, price=10, interannual_variance=0.015, unit="Tn"
)
```
