const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        if (prop.layout === "/admin") {
          if (!prop.nestedData) {
            console.log('No NESTED', prop)
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            )
          } else if (prop.nestedData) {
            console.log('NESTED', prop)
            prop.nestedData.map((route, key) => {
              return (
                <Route
                  path={route.layout + route.path}
                  component={route.component}
                  key={key}
                />
              )
            })
          }
        }
        return null;
      })}
      <Redirect from="/admin" to="/admin/dashboard" />
    </Switch>
  );