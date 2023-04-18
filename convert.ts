import { command, run, string, number, positional, option, boolean, flag } from 'cmd-ts';

function celsius_to_fahrenheit(celsius: number): number {
    return celsius * (9 / 5) + 32;
}

function celsius_to_kelvin(celsius: number): number {
    return celsius + 273.15;
}

function kelvin_to_celsius(kelvin: number): number {
    return kelvin - 273.15;
}

function kelvin_to_fahrenheit(kelvin: number): number {
    return (kelvin - 273.15) * (9 / 5) + 32;
}

function fahrenheit_to_celsius(fahrenheit: number): number {
    return (fahrenheit - 32) * (5 / 9);
}

function fahrenheit_to_kelvin(fahrenheit: number): number {
    return (fahrenheit - 32) * (5 / 9) + 273.15;
}

const cmd = command({
    name: 'temperature_converter',
    description: 'converts the given temperature to another temperature unit',
    version: '1.0.0',
    args: {
        celsius: flag({ type: boolean, long: 'celsius', short: 'c' }),
        fahrenheit: flag({ type: boolean, long: 'fahrenheit', short: 'f' }),
        kelvin: flag({ type: boolean, long: 'kelvin', short: 'k' }),
        value: positional({ type: number, displayName: "value" }),
    },
    handler: (args) => {
        const value: number = args.value;
        let celsius: number = 0;
        let fahrenheit: number = 0;
        let kelvin: number = 0;

        if (args.celsius == true) {
            celsius = value;
            fahrenheit = celsius_to_fahrenheit(celsius);
            kelvin = celsius_to_kelvin(celsius);
        }
        else if (args.fahrenheit == true) {
            fahrenheit = value;
            celsius = fahrenheit_to_celsius(fahrenheit);
            kelvin = fahrenheit_to_kelvin(fahrenheit);
        }
        else if (args.kelvin == true) {
            kelvin = value;
            fahrenheit = kelvin_to_fahrenheit(kelvin);
            celsius = kelvin_to_celsius(kelvin);
        }

        if (kelvin >= 0) {
            if (args.celsius == true) {
                console.log(`${celsius.toFixed(2)} °C is ${fahrenheit.toFixed(2)} °F`)
                console.log(`${celsius.toFixed(2)} °C is ${kelvin.toFixed(2)} K`)
            }
            else if (args.fahrenheit == true) {
                console.log(`${fahrenheit.toFixed(2)} °F is ${celsius.toFixed(2)} °C`)
                console.log(`${fahrenheit.toFixed(2)} °F is ${kelvin.toFixed(2)} K`)
            }
            else if (args.kelvin == true) {
                console.log(`${kelvin.toFixed(2)} K is ${fahrenheit.toFixed(2)} °F`)
                console.log(`${kelvin.toFixed(2)} K is ${celsius.toFixed(2)} °C`)
            }
        }

        else { console.log('Temperature less than absolute zero would break the laws of physics!'); }

    },
});

run(cmd, process.argv.slice(2));