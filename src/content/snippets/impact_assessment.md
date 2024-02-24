---
language: python
highlightLines: 1-3|5
---

```py
sabatier = e2d.project.lca.activities["Sabatier For renewable energy storage"]
ipcc = ("IPCC 2013 no LT", "climate change", "GWP 100a")
e2d.project.lca.LCA({sabatier: 1}, method=ipcc)

e2d.project.lcc.cash_flow(years=30, discount_rate=0.1, construction_time=1.5)
```
