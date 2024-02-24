---
language: python
highlightLines: 1-7|9|11
---

```py
e2d.project.lca.create_activity(
    name="Sabatier for renewable energy storage",
    location="ES",
    unit="normal cubic meter",
    ref_product="SNG",
    production_amount=1.0,
)

sabatier = e2d.project.lca.activities["Sabatier for renewable energy storage"]

ei36 = e2d.lca.database("Ecoinvent 3.6 cut-off")
```
