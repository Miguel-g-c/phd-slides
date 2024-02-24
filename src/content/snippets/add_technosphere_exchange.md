---
language: python
highlightLines: 1-13|16-21|23-24
---

```py
def lci_wind_energy():
    h2_in = e2d.project.simulation.streams["H2"]
    h2_in_mass_flow, _ = h2_in.output.total_mass_flow()
    h2_rec = e2d.project.simulation.streams["H2-REC"]
    h2_rec_mass_flow, _ = h2_rec.output.total_mass_flow()
    h2_mass_flow = h2_in_mass_flow - h2_rec_mass_flow

    el, _ = e2d.project.simulation.utilities["ELECTRICITY"].total_value()

    sng = e2d.project.simulation.streams["N-SYNGAS"]
    sng_volume_flow, _ = sng.output.total_volume_flow()

    return (49 * h2_mass_flow + el) / sng_volume_flow


wind_energy = next(
    act
    for act in ei36
    if act["name"] == "electricity production, wind, >3MW turbine, onshore"
    and act["location"] == "ES"
)

sabatier.new_exchange(amount=lci_wind_energy, input=wind_energy, type="technosphere")
sabatier.save()
```
