import React, {useEffect, useState} from 'react';
import Form from '../components/Form';
import API from '../components/API'

const PageTemplate = (props) => {

    const [items, setItems] = useState([])
    const [editedItem, setEditedItem] = useState(null)

    const months = ['Январь','Февраль', 'Март', 'Апрель', 'Май','Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

    useEffect (() => {
        fetch(`http://localhost:5000/${props.page[0]}/get`, {
            'method':'GET', 
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(resp=>resp.json())
        .then(resp => setItems(resp))
        .catch(err => console.log(err))
    }, [])

    const editItem = (el) => {
        setEditedItem(el)
    }

    const closeForm = () => {
        setEditedItem(null)
    }
    
    const raiseCost = (cost, month) => {
      if (props.page == 'capitalcost') {
        props.handlerData(cost)
      } else {
        props.handlerData(cost,month)
      }
    }

    const deleteItem = (el) => {
        API.DeleteItem(el.id, props.page[0])
        const new_items = items.filter(my_item => {
            if (my_item.id === el.id) {
                return false;
            }
            return true
        })
        setItems(new_items)
    }

    const createdData= (item) => {
        const new_items = [...items, item]
        setItems(new_items)
    }

    const updatedData = (item) => {
        const new_item = items.map(my_item => {
            if(my_item.id === item.id) {
                return item
            } else {
                return my_item
            }
        })
        setItems(new_item)
        setEditedItem(null)
    }

    return (
      <div className="table">
        <h1>{props.page[1]}</h1>
        {props.month ? (
          months.map((month, count, index) => {
            index = 0
            count= count + 1
            return (
              <div className="month" key ={count}>
                <h2>{month} </h2>
                <table>
                  <thead>
                    <tr className='tr-input '>
                      <th className="th-number td-input">#</th>
                      <th className="th-name td-input">Название</th>
                      <th className="th-price td-input">Стоимость</th>
                      <th className="th-amount td-input">Количество</th>
                      <th className="th-cost td-input">Цена</th>
                      <th className="th-action td-input">Действие</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items && items.map((el) => {
                        if (el.month == count) {
                          index = index + 1 
                            return (
                                <tr className="row tr-input " key={el.id}>
                                  <td className="td-number tac td-input">{index}</td>
                                  <td className="td-name tal td-input">{el.name}</td>
                                  <td className="td-price tar td-input">{el.price}</td>
                                  <td className="td-amount tar td-input">{el.amount}</td>
                                  <td className="td-cost tar td-input">{el.cost}</td>
                                  <td className="tar td-btn td-input">
                                    <button onClick={() => editItem(el)}>
                                      <img
                                        className="icon"
                                        src="img/edit_icon.svg"
                                        alt='icon'
                                      ></img>
                                    </button>
                                    <button onClick={() => deleteItem(el)}>
                                      <img
                                        className="icon"
                                        src="img/x_icon.svg"
                                        alt='icon'
                                      ></img>
                                    </button>
                                  </td>
                                </tr>
                              );
                        }
                    })}
                  </tbody>
                  {editedItem ? (
                    <Form
                      page={props.page[0]}
                      item={editedItem}
                      updatedData={updatedData}
                      createdData={createdData}
                      closeForm={closeForm}
                      month={count}
                      raiseCost={raiseCost}
                    />
                  ) : (
                    <Form
                      page={props.page[0]}
                      item={{ name: "", price: "", amount: "", cost: "" }}
                      updatedData={updatedData}
                      createdData={createdData}
                      closeForm={closeForm}
                      month={count}
                      raiseCost={raiseCost}
                    />
                  )}
                </table>
              </div>
            );
          })
        ) : (
          <div>
            <table>
              <thead>
                <tr className='tr-input '>
                  <th className="th-number td-input">#</th>
                  <th className="th-name td-input">Название</th>
                  <th className="th-price td-input">Стоимость</th>
                  <th className="th-amount td-input">Количество</th>
                  <th className="th-cost td-input">Цена</th>
                  <th className="th-action td-input">Действие</th>
                </tr>
              </thead>
              <tbody>
                {items &&
                  items.map((el, index) => {
                    return (
                      <tr className="row tr-input " key={el.id}>
                        <td className="td-number tac td-input">{index + 1}</td>
                        <td className="td-name tal td-input">{el.name}</td>
                        <td className="td-price tar td-input">{el.price}</td>
                        <td className="td-amount tar td-input">{el.amount}</td>
                        <td className="td-cost tar td-input">{el.cost}</td>
                        <td className="tar td-btn td-input">
                          <button onClick={() => editItem(el)}>
                            <img className="icon" src="img/edit_icon.svg" alt='icon'></img>
                          </button>
                          <button onClick={() => deleteItem(el)}>
                            <img className="icon" src="img/x_icon.svg" alt='icon'></img>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
              {editedItem ? (
                <Form
                  page={props.page[0]}
                  item={editedItem}
                  updatedData={updatedData}
                  createdData={createdData}
                  closeForm={closeForm}
                  raiseCost={raiseCost}
                />
              ) : (
                <Form
                  page={props.page[0]}
                  item={{ name: "", price: "", amount: "", cost: "" }}
                  updatedData={updatedData}
                  createdData={createdData}
                  closeForm={closeForm}
                  raiseCost={raiseCost}
                />
              )}
            </table>
          </div>
        )}
      </div>
    );
}
export default PageTemplate;
