---
language: python
highlightLines: 1|3-8|10|12
---

```py
import eco2des as e2d

e2d.projects.create_project(
    name="CO2 methanation for energy storage",
    reference_currency="EUR",
    year=2020,
    location="ES",
)

e2d.projects.current = "C02 methanation for energy storage"

e2d.project.simulation.load_simulation(".//Sabatier_k.bkp")
```
