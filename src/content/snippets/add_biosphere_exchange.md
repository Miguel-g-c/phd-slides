---
language: python
highlightLines: 1|4-11|14-19|21-22
---

```py
bio = e2d.lca.database("biosphere3")


def lci_co2():
    coke = e2d.project.simulation.streams["COKE"]
    coke_mass_flow, _ = coke.output.total_mass_flow()

    sng = e2d.project.simulation.streams["N-SYNGAS"]
    sng_volume_flow, _ = sng.output.total_volume_flow()

    return 44.01 / 12 * coke_mass_flow / sng_volume_flow


co2 = next(
    exc
    for exc in bio
    if "Carbon dioxide, fossil" in exc["name"]
    and "non-urban air or from high stacks" in exc["categories"]
)

sabatier.new_exchange(amount=lci_co2, input=co2, type="biosphere")
sabatier.save()
```
