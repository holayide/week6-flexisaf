import PropTypes from "prop-types";
import eye from "./assets/eye.svg";
import eyeSlash from "./assets/eye-slash.svg";
import { Buttons } from "./component/Buttons";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleCheck(e) {
    setCheck(e.target.checked);
  }

  async function handleLogin() {
    if (!email) {
      return alert("Enter Email");
    } else if (!password) {
      return alert("Enter Password");
    }

    setIsSubmit(true);

    const payload = { username: email, password, check };

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status !== 200) {
        const data = await response.json();
        throw data;
      }

      const result = await response.json();

      if (result) {
        alert("Login successful", result);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmit(false);
    }
  }

  return (
    <div>
      <main>
        <div className="group-btn">
          <Buttons type="long-btn">
            <div className="icons">
              {/* <img src="../../assets/round-facebook.svg" alt="" />  */}
              continue with facebook
            </div>
          </Buttons>
          <Buttons type="long-black-btn">
            <div className="icons">
              {/* <img src="../../assets/apple.svg" alt="" />  */}
              continue with apple
            </div>
          </Buttons>
          <Buttons type="long-white-btn">
            <div className="icons">
              {/* <img src="../../assets/google.svg" alt="" />  */}
              continue with google
            </div>
          </Buttons>
        </div>
        <div className="divider">
          <span>OR</span>
        </div>
        <div className="simpleform">
          <SimpleForm
            name="user"
            type="text"
            placeholder="Email address or username"
            closed=""
            opened=""
            onChange={handleEmail}
          >
            Email address or username
          </SimpleForm>
          <SimpleForm
            name="pwd"
            type="password"
            placeholder="Password"
            closed={eye}
            opened={eyeSlash}
            onChange={handlePassword}
          >
            Password
          </SimpleForm>
        </div>
        <a href="#/">Forget your password?</a>
        <div className="mini">
          <div>
            <input type="checkbox" id="box" onClick={handleCheck} />
            <label htmlFor="box">Remember me</label>
          </div>
          <Buttons type="green-btn" login={handleLogin} disabled={isSubmit}>
            Log In
          </Buttons>
        </div>

        <hr />
        <p>Don&apos;t have an account?</p>
        <Buttons type="long-white-btn space-btn">Sign up</Buttons>
      </main>
    </div>
  );
}

function SimpleForm({
  name,
  type,
  placeholder,
  closed,
  opened,
  onChange,
  children,
}) {
  const [view, setView] = useState(false);

  function handleView() {
    setView((prevView) => !prevView);
  }

  return (
    <div>
      <div className="input-form">
        <label htmlFor={name}>{children}</label> <br />
        <input
          type={view ? "text" : type}
          placeholder={placeholder}
          id={name}
          onChange={onChange}
        />
        <img
          src={view ? opened : closed}
          onClick={handleView}
          alt={opened || closed ? "eye" : ""}
          className="eye"
        />
      </div>
    </div>
  );
}

SimpleForm.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  closed: PropTypes.string.isRequired,
  opened: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node,
};
