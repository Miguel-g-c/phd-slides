---
language: python
highlightLines: 1-10|13-17|20-23|26-28|26,30-36|38-43|45|47-49
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


def eff_storage():
    if not has_passed_constraints():
        return numpy.nan

    sng = e2d.project.simulation.streams["N-SYNGAS"]
    sng_ch4 = sng.composition["CH4"].output.mole_frac()
    sng_h2 = sng.composition["H2"].output.mole_frac()
    sng_co = sng.composition["CO"].output.mole_Frac()
    sng_lhv = sng_ch4 * 35.8 + sng_h2 * 10.8 + sng_co * 12.6  # MJ/cum
    sng_volume_flow, _ = sng.output.total_volume_flow()
    sng_energy = sng_lhv * sng_volume_flow / 3600 * 1000

    h2_in = e2d.project.simulation.streams["H2"]
    h2_in_mass_flow, _ = h2_in.output.total_mass_flow()
    h2_rec = e2d.project.simulation.streams["H2-REC"]
    h2_rec_mass_flow, _ = h2_rec.output.total_mass_flow()
    h2_mass_flow = h2_in_mass_flow - h2_rec_mass_flow
    wind_energy = 49 * h2_mass_flow

    surplus_energy, _ = e2d.project.simulation.utilities["ELECTRICITY"].total_value()

    eff = sng_energy / (wind_energy + surplus_energy)

    return eff
```
