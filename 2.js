class Rule {
        apply(data, condition) {
            throw new Error("Метод apply повинен бути реалізованим.");
        }
    }

    class IncludeRule extends Rule {
        apply(data, conditions) {
            return data.filter(item =>
                conditions.every(cond =>
                    Object.entries(cond).every(([key, value]) => item[key] === value)
                )
            );
        }
    }

    class ExcludeRule extends Rule {
        apply(data, conditions) {
            return data.filter(item =>
                conditions.every(cond =>
                    !Object.entries(cond).some(([key, value]) => item[key] === value)
                )
            );
        }
    }

    class SortRule extends Rule {
        apply(data, keys) {
            return [...data].sort((a, b) => {
                for (const key of keys) {
                    if (a[key] < b[key]) return -1;
                    if (a[key] > b[key]) return 1;
                }
                return 0;
            });
        }
    }

    class DataProcessor {
        constructor() {
            this.rules = {
                include: new IncludeRule(),
                exclude: new ExcludeRule(),
                sort_by: new SortRule()
            };
        }

        process(input) {
            let { data, condition } = input;
            for (const [rule, params] of Object.entries(condition)) {
                if (this.rules[rule]) {
                    data = this.rules[rule].apply(data, params);
                }
            }
            return { result: data };
        }
    }

    const inputElement = document.getElementById('json-input');
    const resultContainer = document.getElementById('result-container');
    const resultElement = document.getElementById('result');
    const Btn = document.getElementById('btn');

    Btn.addEventListener('click', () => {
        try {
            const input = JSON.parse(inputElement.value);
            const processor = new DataProcessor();
            const output = processor.process(input);

            resultElement.innerHTML = "";

            output.result.forEach(item => {
                const recordDiv = document.createElement('div');
                recordDiv.classList.add('record');

                for (const [key, value] of Object.entries(item)) {
                    if (key === "disabled") {
                        const checkboxLabel = document.createElement('p');
                        const checkbox = document.createElement('input');
                        checkbox.type = "checkbox";
                        checkbox.checked = value; 
                        checkbox.disabled = true;
                        checkboxLabel.textContent = "Disabled: ";
                        checkboxLabel.appendChild(checkbox);
                        recordDiv.appendChild(checkboxLabel);
                    } else {
                        const paragraph = document.createElement('p');
                        paragraph.textContent = `${capitalizeFirstLetter(key)}: ${value}`;
                        recordDiv.appendChild(paragraph);
                    }
                }

                resultElement.appendChild(recordDiv);
            });

            resultContainer.style.display = 'block';
            resultContainer.classList.remove('error');
        } catch (error) {
            resultElement.innerHTML = "";
            const errorParagraph = document.createElement('p');
            errorParagraph.textContent = `Помилка: ${error.message}`;
            errorParagraph.classList.add('error');
            resultElement.appendChild(errorParagraph);

            resultContainer.style.display = 'block';
        }
    });

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }