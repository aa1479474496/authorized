let CURRENT = 'NULL';

const renderAuthorize = Authorized => {
  return currentAuthority => {
    if(currentAuthority) {
      CURRENT = currentAuthority;
    }
    else {
      CURRENT = 'NULL';
    }
    return Authorized;
  }
}

export default Authorized => renderAuthorize(Authorized);

