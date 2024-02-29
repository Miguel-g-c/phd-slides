---
language: python
highlightLines: 1-10|13-17|20-23
---

```py
def has_passed_constraints():
    sng = e2d.project.simulation.streams["N-SYNGAS"]
    sng_h2 = sng.composition["H2"].output.mole_frac()
    sng_co = sng.composition["CO"].output.mole_frac()
    sng_co2 = sng.composition["C02"].output.mole_frac()

    if sng_h2 > 0.05 or sng_co > 0.02 or sng_co2 > 0.02:
        return False

    return True


def gwp():
    if not has_passed_constraints():
        return numpy.nan
    ipcc = ("IPCC 2013 no LT", "climate change", "GWP 100a")
    return e2d.project.lca.scores.get(ipcc)


def lcop():
    if not has_passed_constraints():
        return numpy.nan
    return e2d.project.lcc.results.lcop
```
