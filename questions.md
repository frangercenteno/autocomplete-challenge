1. What is the difference between Component and PureComponent? give an example where it might break my app.

**Component**: When a component is re-rendered, it will trigger a re-render for itself and all its child components, regardless of whether the component's props or state have changed. Also, the **`shouldComponentUpdate`** method of a Component returns true, indicating that the component should always re-render.

```jsx
class MyComponent extends React.Component {
  render() {
    return <div>Hello, {this.props.name}!</div>;
  }
}
```

**PureComponent**: A subclass of Component that implements a shallow comparison of props and state in the **`shouldComponentUpdate`** method. If a PureComponent determines that the props and state haven't changed, it will prevent the component from re-rendering. This can help optimize performance by avoiding unnecessary re-renders.

```jsx
class MyPureComponent extends React.PureComponent {
  render() {
    return <div>Hello, {this.props.name}!</div>;
  }
}
```

2. Context + ShouldComponentUpdate might be dangerous. Can you think of why is
   that?

Using **Context** with **shouldComponentUpdate** can be dangerous because `shouldComponentUpdate` only performs a shallow comparison of the props and state. When you use `Context` to pass data down the component tree, any changes to the context value will trigger re-renders for all the components consuming that context, regardless of whether the actual relevant data has changed.

3. Describe 3 ways to pass information from a component to its PARENT.

- 3.1 By props and callbacks: You can pass callback functions by props who could be called by children props.
- 3.2 By ContextAPI
- 3.3. By redux with dispatch.
- 3.4. Also, exists emitters, but I never have used it.

4. Give 2 ways to prevent components from re-rendering.

- 4.1 Using **PureComponent** instead of **Component**.
- 4.2 Using **shouldComponentUpdate** method.
- 4.3 Using **React.memo**.

5. What is a fragment and why do we need it? Give an example where it might
   break my app.

A common pattern in React is for a component to return multiple elements. Fragments let you group a list of children without adding extra nodes to the DOM.

```jsx
function Component(props) {
  return (
    <dl>
      {props.items.map((item) => (
        // Without the `key`, React will fire a key warning
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```

6. Give 3 examples of the HOC pattern.

- `withRouter`: A HOC provided by React Router, used to enhance a component with routing capabilities. It injects the router props (e.g., `history`, `location`, `match`) into the wrapped component, allowing it to access and interact with the routing functionality.
- `withTheme`: it used to inject information about theme which is used by user.
- `withAuth`: it used to inject information about authentication.

7. what's the difference in handling exceptions in promises, callbacks and
   async...await.

- **Promises**: If a promise is rejected and you don't catch the error, the error will bubble up to the closest parent promise that does catch the error. If there is no parent promise that catches the error, the error will be passed to the global error handler.
- **Callbacks**: If an error is thrown inside a callback and you don't catch the error, the error will be passed to the global error handler. If an error occurs during the execution of the callback, you can check the error argument and handle the error accordingly.
- **async...await**: If an error is thrown inside an async function and you don't catch the error, the error will be passed to the global error handler. However, you can use a try...catch statement inside the async function to catch the error.

8. How many arguments does setState take and why is it async.

`setState` takes two arguments: an object that will be merged into the new state, and an optional callback function that will be executed once `setState` is completed and the component is re-rendered.

9. List the steps needed to migrate a Class to Function Component.

a. Create a new function component.
b. Copy the body of the render method into the function component while removing the `render()` method and replacing it with a `return` statement.
c. Replace `this.props` with `props` and change this.state to a state variable declared with the `useState` hook.
d. Replace lifecycle methods with the `useEffect` hook.
f. Delete the remaining empty class declaration.

10. List a few ways styles can be used with components.

- 10.1 Inline styles
- 10.2 CSS stylesheets
- 10.3 CSS modules
- 10.4 CSS-in-JS libraries like styled-components and emotion

11. How to render an HTML string coming from the server.

You can use the `dangerouslySetInnerHTML` prop to render an HTML string.

```jsx
function App() {
  const htmlString = "<div>Hello, world!</div>";
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
}
```

Also, whit React 18, you can use Server Components.
