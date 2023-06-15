import "./App.css";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";

const options = [
  {
    value: "United Kingdom",
    label: "United Kingdom",
  },
  {
    value: "USA",
    label: "USA",
  },
  {
    value: "France",
    label: "France",
  },
  {
    value: "Spain",
    label: "Spain",
  },
];

const getValue = (value) =>
  value ? options.find((options) => options.value === value) : "";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="wrapper">
      <h1 className='title'>Shipping form</h1>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              placeholder="name"
              {...register("name", { required: "Name is required field!" })}
            />
            {errors.name && (
              <div style={{ color: "crimson" }}>{errors.name.message}</div>
            )}
          </div>
          <div>
            <input
              placeholder="email"
              {...register("email", {
                required: "Email is required field!",

                pattern: {
                  value:
                    /^([a-z0-9_-]+\.)*[a-z0-9_-]+@([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/,
                  message: "Please enter valid email",
                },
              })}
            />
            {errors?.email && (
              <div style={{ color: "crimson" }}>{errors.email.message}</div>
            )}
          </div>
          <div className="controller">
            <Controller
              rules={{ required: "Country is required" }}
              control={control}
              name="address"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <div>
                  <ReactSelect
                    placeholder="Countries"
                    options={options}
                    value={getValue(value)}
                    onChange={(newValue) => onChange(newValue)}
                  />
                  {errors.address && (
                    <div style={{ color: "crimson", }}>{errors.address.message}</div>
                  )}
                </div>
              )}
            />
          </div>
          <div>
            <input
              placeholder="City"
              {...register("city", { required: "City is required field!" })}
            />
            {errors.city && (
              <div style={{ color: "crimson" }}>{errors.city.message}</div>
            )}
          </div>
          <div>
            <input
              placeholder="Street"
              {...register("street", { required: "Street is required field!" })}
            />
            {errors.street && (
              <div style={{ color: "crimson" }}>{errors.street.message}</div>
            )}
          </div>
          <div>
            <input
              placeholder="House"
              {...register("house", { required: "House is required field!" })}
            />
            {errors.house && (
              <div style={{ color: "crimson" }}>{errors.house.message}</div>
            )}
          </div>
          <div>
            <button>Send!</button>
          </div>
        </form>
        <div>
          <button
            onClick={() => {
              setValue("name", "Alexey");
              setValue("email", "test@test.ru");
            }}
          >
            Fill data
          </button>
        </div>
      </div>
  );
}

export default App;
