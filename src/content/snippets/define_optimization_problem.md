---
language: python
highlightLines: 1|3-13|15|17
---

```py
algorithm = e2d.optimization.nsga2(gen=20)

problem = e2d.project.optimization.problem(
    variables=(
        h2_co2_ratio,
        reactor_temp,
        reactor_length,
        reactor_ld_ratio,
        working_fluid,
    ),
    bounds=([4, 250, 1, 1, 0], [5, 400, 20, 10, 1]),
    objectives=(gwp, lcop),
)

initial_population = e2d.project.optimization.population(problem, 190)

evolved_population = algorithm.evolve(initial_population)
```
