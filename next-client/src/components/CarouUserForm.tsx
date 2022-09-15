import { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import { useStoreActions } from 'easy-peasy';

const FormTabs = (props) => {
    const {refs, focus} = props;

    let tabs = [];

    const handleClick = (ref,stringname) => {
        props.changeFocus(ref,stringname)
    }

    for (let key in refs) {
        let classes = ['form-tab'];
        let tabname = (key === 'verify') ? 'verify password' : key;
        if (key === focus) {classes.push('focus')}
        let li = <li 
            key={key}
            className={classes.join(' ')}
            onClick={()=>handleClick(refs[key],`${key}`)}
            >
                {`${tabname}:`}
            </li>
        ;
        tabs.push(li)
    }

    useEffect(() => {
        props.changeFocus(refs[focus], focus);
    }, [])

    return (<ul className='form-tabs'>{tabs}</ul>);
}

const EmailForm = (props) => {
    return(
        (<form onSubmit={props.handleSubmitEmail}><label>
                <input ref={props.EMinputRef} type="text" value={props.email} onChange={props.setEmail} onFocus={()=>props.changeFocus(props.EMinputRef, 'email')} />
            </label>
            </form>)
    )
}

const PasswordForm = (props) => {
    return (<form onSubmit={props.handleSubmitPassword}><label>
        <input ref={props.PWinputRef} type="text" value={props.password} onChange={props.setPassword} onFocus={()=>props.changeFocus(props.PWinputRef, 'password')} />
    </label>
    {(!props.createMode) ? <input type="submit" value="Submit" /> : null}
    </form>);
}

const VerifyForm = (props) => {
    return (props.createMode) ? (<form onSubmit={props.handleSubmitPassword}><label>
        <input ref={props.VPinputRef} type="text" value={props.verify} onChange={props.setVerify} onFocus={()=>props.changeFocus(props.VPinputRef, 'verify')} />
    </label>
    <Button color="primary" variant="outlined" type="submit" value="Submit">Submit</Button>
    </form>) : null
}

const CarouUserForm = (props) => {
    const {createMode} = props;
    const [focus,setFocus] = useState('email');
    const [verify, setVerify] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const EMinputRef = useRef();
    const PWinputRef = useRef();
    const VPinputRef = useRef();

    let refs = {
        email: EMinputRef,
        password: PWinputRef
    };

    if (createMode) {
        refs = {
            ...refs,
            verify: VPinputRef,
        }
    }

    const createUser = useStoreActions((actions) => actions.users.createUser);
    const loginUser = useStoreActions((actions) => actions.users.loginUser);

    const handleSubmitPassword = (event) => {
        event.preventDefault();
        loginUser({
            email: email,
            password: password
        });
    }

    const handleSubmitCreate = (event) => {
        event.preventDefault();
        if (verify === password) {
            createUser({
                email: email,
                password: password
            });
        } else {
            console.log('didnt match');
        }
    }

    const changeFocus = (ref, stringname) => {
        ref.current.scrollIntoView({behavior: 'smooth', block: 'start'});
        console.log(ref.current);
        ref.current.focus();
        setFocus(stringname);
    }

    return (
        <div className="carou-user-form-and-tabs">

            <FormTabs
                refs={refs}
                focus={focus}
                changeFocus={changeFocus}
                createMode={createMode}
            />
            <div className="carou-user-form">
                <EmailForm
                    EMinputRef={EMinputRef}
                    changeFocus={changeFocus}
                    email={email}
                    setEmail={(e) => setEmail(e.target.value)}
                    createMode={createMode}
                />
                <PasswordForm
                    PWinputRef={PWinputRef}
                    changeFocus={changeFocus}
                    password={password}
                    setPassword={(e) => setPassword(e.target.value)}
                    createMode={createMode}
                    handleSubmitPassword={ createMode ? ()=>changeFocus(VPinputRef,'verify') : handleSubmitPassword }
                />
                <VerifyForm
                    VPinputRef={VPinputRef}
                    changeFocus={changeFocus}
                    verify={verify}
                    setVerify={(e) => setVerify(e.target.value)}
                    createMode={createMode}
                    handleSubmitPassword={handleSubmitCreate}
                />
            </div>
        </div>
    );

}

export default CarouUserForm
